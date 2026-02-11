'use client';

import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement
} from '@stripe/react-stripe-js';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
  amount: number; // Amount in pence (e.g., 5000 for £50.00)
  currency?: string;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: any) => void;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address?: {
      line1: string;
      city: string;
      postal_code: string;
      country: string;
    };
  };
}

const CardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      backgroundColor: '#ffffff',
      padding: '12px',
    },
    invalid: {
      color: '#9e2146',
    },
  },
  hidePostalCode: true, // We collect this separately
};

function CheckoutForm({ 
  amount, 
  currency = 'gbp', 
  onSuccess, 
  onError, 
  customerDetails 
}: StripeCheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [prButtonReady, setPrButtonReady] = useState(false);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'GB',
        currency,
        total: { label: 'Total', amount },
        requestPayerName: true,
        requestPayerEmail: true,
      });
      pr.canMakePayment().then(result => {
        const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown';
        console.log('Stripe canMakePayment result:', result);
        console.log('User agent:', userAgent);
        if (result) {
          setPaymentRequest(pr);
          setPrButtonReady(true);
        } else {
          setPrButtonReady(false);
        }
      });
    }
    // Native PaymentRequest API Google Pay readiness debug
    if (typeof window !== 'undefined' && window.PaymentRequest) {
      const supportedInstruments = [{
        supportedMethods: 'https://google.com/pay',
        data: {
          environment: 'PRODUCTION',
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [{
            type: 'CARD',
            parameters: {
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks: ['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification: {
              type: 'PAYMENT_GATEWAY',
              parameters: {
                gateway: 'stripe',
                'stripe:version': '2020-08-27',
                'stripe:publishableKey': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
              }
            }
          }]
        }
      }];
      const details = {
        total: { label: 'Test', amount: { currency: 'GBP', value: '1.00' } }
      };
      try {
        const request = new window.PaymentRequest(supportedInstruments, details);
        request.canMakePayment().then(function(result) {
          console.log('Native PaymentRequest canMakePayment:', result);
        });
      } catch (err) {
        console.log('Native PaymentRequest error:', err);
      }
    }
  }, [stripe, amount, currency]);

  useEffect(() => {
    if (!paymentRequest) return;
    paymentRequest.on('paymentmethod', async (ev: any) => {
      setIsLoading(true);
      setPaymentError(null);
      try {
        // Create payment intent on your backend
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount,
            currency,
            customer_details: customerDetails,
            payment_method: ev.paymentMethod.id,
            is_wallet: true
          }),
        });
        const paymentIntentData = await response.json();
        if (!response.ok || !paymentIntentData.client_secret) {
          ev.complete('fail');
          setPaymentError(paymentIntentData.error || 'Failed to create payment intent');
          setIsLoading(false);
          return;
        }
        if (!stripe) {
          setPaymentError('Stripe is not loaded');
          setIsLoading(false);
          ev.complete('fail');
          return;
        }
        // Confirm the payment without handling card details
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          paymentIntentData.client_secret,
          { payment_method: ev.paymentMethod.id },
          { handleActions: false }
        );
        if (confirmError) {
          ev.complete('fail');
          setPaymentError(confirmError.message || 'Payment error');
          setIsLoading(false);
          return;
        }
        if (paymentIntent.status === 'requires_action') {
          // Handle next actions (e.g., 3D Secure)
          if (!stripe) {
            setPaymentError('Stripe is not loaded');
            setIsLoading(false);
            ev.complete('fail');
            return;
          }
          const { error: actionError, paymentIntent: finalIntent } = await stripe.confirmCardPayment(paymentIntentData.client_secret);
          if (actionError) {
            ev.complete('fail');
            setPaymentError(actionError.message || 'Payment error');
            setIsLoading(false);
            return;
          }
          if (finalIntent.status === 'succeeded') {
            ev.complete('success');
            onSuccess(finalIntent);
            setIsLoading(false);
            return;
          }
        } else if (paymentIntent.status === 'succeeded') {
          ev.complete('success');
          onSuccess(paymentIntent);
          setIsLoading(false);
          return;
        }
        ev.complete('fail');
        setPaymentError('Payment failed');
        setIsLoading(false);
      } catch (error: any) {
        ev.complete('fail');
        setPaymentError(error.message || 'Payment failed');
        setIsLoading(false);
      }
    });
  }, [paymentRequest, stripe, amount, currency, customerDetails, onSuccess]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.error('❌ Stripe not loaded or elements not available');
      return;
    }

    setIsLoading(true);
    setPaymentError(null);

    // Enhanced iOS Safari detection and logging
    const userAgent = navigator.userAgent;
    const isIOSSafari = /iPad|iPhone|iPod/.test(userAgent) && /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS/.test(userAgent);
    const isIOSWebView = /iPad|iPhone|iPod/.test(userAgent) && !/Safari/.test(userAgent);
    const isIOS = isIOSSafari || isIOSWebView;

    console.log('🏗️ Starting Stripe payment submission');
    console.log('🔍 Device detection:', { userAgent, isIOSSafari, isIOSWebView, isIOS });

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error('❌ Card element not found');
      setPaymentError('Card element not found');
      setIsLoading(false);
      return;
    }

    try {
      console.log('💳 Creating payment intent with amount:', amount, 'currency:', currency);
      
      // Create payment intent on your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          currency,
          customer_details: customerDetails,
          ios_safari: isIOS // Flag for backend iOS handling
        }),
      });

      const paymentIntentData = await response.json();
      console.log('✅ Payment intent response:', paymentIntentData);

      if (!response.ok) {
        console.error('❌ Payment intent creation failed:', paymentIntentData);
        
        // Store error for iOS debugging
        if (isIOS) {
          localStorage.setItem('stripePaymentIntentError', JSON.stringify({
            error: paymentIntentData,
            userAgent,
            timestamp: new Date().toISOString(),
            amount,
            currency
          }));
        }
        
        throw new Error(paymentIntentData.error || 'Failed to create payment intent');
      }

      if (!paymentIntentData.client_secret) {
        console.error('❌ No client secret received');
        throw new Error('No client secret received from payment intent');
      }

      console.log('🔄 Confirming payment with Stripe...');
      
      // Confirm payment with card element
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
        paymentIntentData.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: customerDetails.name,
              email: customerDetails.email,
              phone: customerDetails.phone,
              address: customerDetails.address,
            },
          }
        }
      );

      console.log('💳 Payment confirmation result:', { confirmError, paymentIntent });

      if (confirmError) {
        console.error('❌ Payment confirmation error:', confirmError);
        
        // Enhanced error storage for iOS debugging
        if (isIOS) {
          localStorage.setItem('stripeConfirmError', JSON.stringify({
            error: {
              code: confirmError.code,
              message: confirmError.message,
              type: confirmError.type,
              charge: confirmError.charge,
              decline_code: confirmError.decline_code,
              doc_url: confirmError.doc_url
            },
            userAgent,
            timestamp: new Date().toISOString(),
            paymentIntentId: paymentIntentData.client_secret
          }));
        }
        
        throw confirmError;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('🎉 Payment succeeded:', paymentIntent.id);
        
        // Store successful payment details
        const paymentDetails = {
          paymentIntentId: paymentIntent.id,
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          status: paymentIntent.status,
          timestamp: new Date().toISOString(),
          customerDetails,
          isIOS,
          isSafari: /Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS/.test(userAgent)
        };
        
        localStorage.setItem('lastStripePayment', JSON.stringify(paymentDetails));
        console.log('💾 Payment details saved to localStorage');
        
        // Safari-specific handling: avoid redirects entirely
        if (isIOS || (/Safari/.test(userAgent) && !/Chrome|CriOS|FxiOS/.test(userAgent))) {
          console.log('🍎 Safari/iOS detected - using no-redirect approach');
          
          // Set a flag to trigger success UI without redirect
          localStorage.setItem('safariPaymentSuccess', 'true');
          localStorage.setItem('safariPaymentTimestamp', Date.now().toString());
          
          // Use immediate callback but with Safari-safe flag
          onSuccess({
            ...paymentIntent,
            safariMode: true,
            noRedirect: true
          });
        } else {
          console.log('🖥️ Non-Safari device - standard callback');
          onSuccess(paymentIntent);
        }
      } else {
        console.error('❌ Payment failed with status:', paymentIntent?.status);
        
        if (isIOS) {
          localStorage.setItem('stripePaymentStatusError', JSON.stringify({
            status: paymentIntent?.status,
            paymentIntentId: paymentIntent?.id,
            userAgent,
            timestamp: new Date().toISOString()
          }));
        }
        
        throw new Error(`Payment ${paymentIntent?.status || 'failed'}`);
      }

    } catch (error: any) {
      console.error('❌ Stripe payment error:', error);
      console.error('❌ Stripe error details:', JSON.stringify(error, null, 2));
      
      // Comprehensive error storage for iOS debugging
      if (isIOS) {
        localStorage.setItem('stripeGeneralError', JSON.stringify({
          error: {
            message: error?.message,
            name: error?.name,
            stack: error?.stack,
            code: error?.code,
            type: error?.type
          },
          userAgent,
          timestamp: new Date().toISOString(),
          amount,
          currency,
          customerDetails: customerDetails.name
        }));
        
        console.error('❌ Stripe error on iOS - stored in localStorage for debugging');
      }
      
      const errorMessage = error.message || 'An unexpected error occurred';
      setPaymentError(errorMessage);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(!prButtonReady || !paymentRequest) && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center">
          <div>
            <strong>Apple Pay and Google Pay are not available on this device or browser.</strong>
          </div>
          <div className="text-xs mt-2">
            Please use Safari on an Apple device for Apple Pay, or Chrome/Android for Google Pay.<br/>
            If you believe this is an error, please contact support and mention your browser and device.
          </div>
        </div>
      )}
      {prButtonReady && paymentRequest && (
        <div className="mb-6">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
          <div className="text-xs text-gray-500 text-center mt-2">
            Pay instantly with Apple Pay, Google Pay, or browser wallet
          </div>
        </div>
      )}
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <CardElement options={CardElementOptions} />
      </div>
      {paymentError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{paymentError}</p>
        </div>
      )}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Total Amount:</span>
          <span className="font-semibold text-lg">
            £{(amount / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
          <span>Processing fee:</span>
          <span>Included</span>
        </div>
      </div>
      <Button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 px-6 rounded-lg"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay £${(amount / 100).toFixed(2)}`
        )}
      </Button>
      <div className="text-center text-xs text-gray-500">
        <p>Your payment is secured by Stripe</p>
        <p>256-bit SSL encryption • PCI DSS compliant</p>
      </div>
    </form>
  );
}

export function StripeCheckout(props: StripeCheckoutProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm {...props} />
    </Elements>
  );
}

// Alternative: Stripe Payment Element (newer, more features)
export function StripePaymentElement(props: StripeCheckoutProps) {
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#f97316',
      colorBackground: '#ffffff',
      colorText: '#1f2937',
      colorDanger: '#dc2626',
      fontFamily: '"Inter", sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  };

  const options = {
    appearance,
    currency: props.currency || 'gbp',
    amount: props.amount,
    automatic_payment_methods: {
      enabled: true,
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm {...props} />
    </Elements>
  );
}