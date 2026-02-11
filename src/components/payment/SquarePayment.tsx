'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard } from 'lucide-react';

interface SquarePaymentProps {
  amount: number;
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
  orderId: string;
  clientId?: string; // Add clientId prop
}

declare global {
  interface Window {
    Square: any;
  }
}

export function SquarePayment({ amount, onSuccess, onError, customerDetails, orderId, clientId }: SquarePaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const paymentsRef = useRef<any>(null);
  const cardRef = useRef<any>(null);

  useEffect(() => {
    // Load Square Web Payments SDK
    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.onload = initializeSquare;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initializeSquare = async () => {
    try {
      if (!window.Square) {
        throw new Error('Square SDK not loaded');
      }

      const payments = window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APP_ID!, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID!);
      paymentsRef.current = payments;

      const card = await payments.card({
        style: {
          '.input-container.is-focus': {
            borderColor: '#f97316'
          },
          '.input-container.is-error': {
            borderColor: '#ef4444'
          },
          '.card-number': {
            fontSize: '16px'
          },
          '.expiration-date': {
            fontSize: '16px'
          },
          '.cvv': {
            fontSize: '16px'
          }
        }
      });

      await card.attach(cardContainerRef.current);
      cardRef.current = card;
      setIsInitialized(true);

    } catch (error) {
      console.error('Error initializing Square:', error);
      onError({ message: 'Failed to initialize payment system' });
    }
  };

  const handlePayment = async () => {
    if (!cardRef.current || !paymentsRef.current) {
      onError({ message: 'Payment system not ready' });
      return;
    }

    setIsLoading(true);

    try {
      // Get payment token
      const result = await cardRef.current.tokenize();
      
      if (result.status === 'OK') {
        // Create payment on your server
        const response = await fetch('/api/square/create-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: amount,
            currency: 'GBP',
            customerDetails: customerDetails,
            orderId: orderId,
            verificationToken: result.verificationToken,
            clientId: clientId || 'tk-afro-kitchen' // Default to TK Afro Kitchen if not provided
          }),
        });

        const paymentResult = await response.json();

        if (paymentResult.success) {
          console.log('Square payment successful:', paymentResult);
          onSuccess({
            id: paymentResult.paymentId,
            method: 'square',
            amount: paymentResult.amount,
            currency: paymentResult.currency,
            status: paymentResult.status,
            orderId: paymentResult.orderId,
            receiptUrl: paymentResult.receiptUrl
          });
        } else {
          throw new Error(paymentResult.error || 'Payment failed');
        }
      } else {
        throw new Error('Failed to tokenize payment method');
      }
    } catch (error: any) {
      console.error('Square payment error:', error);
      onError({
        message: error.message || 'Payment processing failed',
        code: error.code || 'PAYMENT_ERROR'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-orange-500" />
          <h3 className="font-semibold text-gray-900">Pay with Card</h3>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Information
            </label>
            <div 
              ref={cardContainerRef}
              className="w-full h-12 border border-gray-300 rounded-md"
            />
          </div>
          
          <div className="text-xs text-gray-500">
            Your payment will be processed securely by Square. 
            <br />
            <span className="font-medium">Fee: 1.9% + 20p</span> • <span className="font-medium">Settlement: Same day</span>
          </div>

          {/* Fee Breakdown */}
          <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-xs font-medium text-gray-700 mb-2">Payment Fee Breakdown:</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Base Amount:</span>
                <span>£{(amount - (amount * 0.019) - 0.20 - (amount * 0.005) - 0.10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span>Square Fee (1.9% + 20p):</span>
                <span>£{((amount * 0.019) + 0.20).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Platform Fee (0.5% + 10p):</span>
                <span>£{((amount * 0.005) + 0.10).toFixed(2)}</span>
              </div>
              <div className="border-t pt-1 flex justify-between font-medium">
                <span>Total:</span>
                <span>£{amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={!isInitialized || isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>Pay £{amount.toFixed(2)}</span>
            <span className="text-sm opacity-90">via Square</span>
          </div>
        )}
      </Button>

      {!isInitialized && (
        <div className="text-center text-sm text-gray-500">
          Loading payment system...
        </div>
      )}
    </div>
  );
} 