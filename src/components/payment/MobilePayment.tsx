'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Smartphone, Apple, CreditCard } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface MobilePaymentProps {
  amount: number; // Amount in pence
  currency?: string;
  onSuccess: (paymentData: any) => void;
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

export function MobilePayment({
  amount,
  currency = 'gbp',
  onSuccess,
  onError,
  customerDetails
}: MobilePaymentProps) {
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState<any>(null);
  const [canMakePayment, setCanMakePayment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: 'GB',
      currency: currency.toLowerCase(),
      total: {
        label: 'TK Afro Kitchen Order',
        amount: amount,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      requestShipping: true,
      disableWallets: ['link', 'browserCard'],
    });

    // Check if the Payment Request is supported
    pr.canMakePayment().then((result) => {
      console.log('🔍 Payment Request support check:', result);
      
      if (result) {
        setCanMakePayment(true);
        setIsSupported(true);
        
        // Check specific wallet support
        if (result.applePay || result.googlePay) {
          console.log('✅ Apple Pay or Google Pay supported');
        }
      } else {
        console.log('❌ Payment Request not supported');
        setIsSupported(false);
      }
    });

    pr.on('paymentmethod', async (event) => {
      console.log('💳 Payment method received:', event);
      setIsLoading(true);
      setError(null);

      try {
        // Create payment intent
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount,
            currency,
            customer_details: customerDetails,
            payment_method_types: ['card'],
            use_payment_request: true
          }),
        });

        const paymentIntentData = await response.json();

        if (!response.ok) {
          throw new Error(paymentIntentData.error || 'Failed to create payment intent');
        }

        // Confirm the payment
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
          paymentIntentData.client_secret,
          {
            payment_method: event.paymentMethod.id,
          },
          {
            handleActions: false,
          }
        );

        if (confirmError) {
          console.error('❌ Payment confirmation error:', confirmError);
          throw confirmError;
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
          console.log('🎉 Mobile payment succeeded:', paymentIntent.id);
          
          // Store payment details
          const paymentDetails = {
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency,
            status: paymentIntent.status,
            paymentMethod: event.paymentMethod.type,
            timestamp: new Date().toISOString(),
            customerDetails,
            wallet: event.paymentMethod.card?.wallet || 'unknown'
          };
          
          localStorage.setItem('lastMobilePayment', JSON.stringify(paymentDetails));
          onSuccess(paymentDetails);
        } else {
          throw new Error('Payment failed');
        }
      } catch (err: any) {
        console.error('❌ Mobile payment error:', err);
        setError(err.message || 'Payment failed');
        onError(err);
      } finally {
        setIsLoading(false);
      }
    });

    pr.on('cancel', () => {
      console.log('❌ Payment cancelled by user');
      setError('Payment was cancelled');
    });

    setPaymentRequest(pr);
  }, [stripe, amount, currency, customerDetails, onSuccess, onError]);

  const handlePayment = () => {
    if (paymentRequest) {
      paymentRequest.show();
    }
  };

  // If not supported, show alternative
  if (!isSupported) {
    return (
      <div className="space-y-4">
        <div className="text-center p-6 bg-gray-50 rounded-lg border">
          <Smartphone className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mobile Payment Not Available
          </h3>
          <p className="text-gray-600 mb-4">
            Apple Pay and Google Pay are not available on this device or browser.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Apple className="w-4 h-4 mr-1" />
              <span>Apple Pay</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 mr-1" />
              <span>Google Pay</span>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Please use one of our other payment methods:
          </p>
          <div className="flex justify-center space-x-2">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              Credit Card
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
              Bank Transfer
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Mobile Payment
        </h3>
        <p className="text-gray-600 mb-4">
          Pay securely with Apple Pay or Google Pay
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <Button
        onClick={handlePayment}
        disabled={!canMakePayment || isLoading}
        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Smartphone className="w-5 h-5" />
            <span>Pay with Apple Pay / Google Pay</span>
          </>
        )}
      </Button>

      <div className="text-center text-xs text-gray-500">
        <p>Secure payment powered by Stripe</p>
        <div className="flex items-center justify-center space-x-4 mt-2">
          <div className="flex items-center">
            <Apple className="w-4 h-4 mr-1" />
            <span>Apple Pay</span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-1" />
            <span>Google Pay</span>
          </div>
        </div>
      </div>
    </div>
  );
} 