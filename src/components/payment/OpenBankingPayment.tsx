'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Building2, CheckCircle, AlertCircle } from 'lucide-react';
import { SUPPORTED_BANKS, calculateOpenBankingFees } from '@/lib/openbanking';

interface OpenBankingPaymentProps {
  amount: number;
  onSuccess: (paymentData: any) => void;
  onError: (error: any) => void;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  orderId: string;
  clientId?: string;
}

export function OpenBankingPayment({ 
  amount, 
  onSuccess, 
  onError, 
  customerDetails, 
  orderId, 
  clientId 
}: OpenBankingPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBank, setSelectedBank] = useState('');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  const fee = calculateOpenBankingFees(amount);
  const totalAmount = amount + fee;

  const handlePayment = async () => {
    if (!selectedBank) {
      onError({ message: 'Please select your bank' });
      return;
    }

    setIsLoading(true);

    try {
      // Create Open Banking payment
      const response = await fetch('/api/openbanking/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          currency: 'GBP',
          customerDetails: customerDetails,
          orderId: orderId,
          bankId: selectedBank,
          clientId: clientId || 'tk-afro-kitchen'
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('Open Banking payment initiated:', result);
        
        // Redirect to bank authorization
        if (result.authorizationUrl) {
          setIsAuthorizing(true);
          window.location.href = result.authorizationUrl;
        } else {
          onSuccess({
            id: result.paymentId,
            method: 'openbanking',
            amount: result.amount,
            fee: result.fee,
            totalAmount: result.totalAmount,
            currency: result.currency,
            status: result.status,
            orderId: result.orderId,
            bankId: selectedBank
          });
        }
      } else {
        throw new Error(result.error || 'Payment failed');
      }
    } catch (error: any) {
      console.error('Open Banking payment error:', error);
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
          <Building2 className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-900">Instant Bank Transfer</h3>
        </div>
        
        <div className="space-y-4">
          {/* Bank Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Your Bank
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Choose your bank...</option>
              {SUPPORTED_BANKS.map((bank) => (
                <option key={bank} value={bank.toLowerCase().replace(/\s+/g, '_')}>
                  {bank}
                </option>
              ))}
            </select>
          </div>

          {/* Fee Breakdown */}
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-xs font-medium text-gray-700 mb-2">Payment Breakdown:</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Order Amount:</span>
                <span>£{amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-blue-600">
                <span>Open Banking Fee (0.3%):</span>
                <span>£{fee.toFixed(2)}</span>
              </div>
              <div className="border-t pt-1 flex justify-between font-medium">
                <span>Total:</span>
                <span>£{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Instant transfer from your bank account</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>No card details required</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Secure Open Banking technology</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              <span>Lowest fees available</span>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={handlePayment}
        disabled={!selectedBank || isLoading || isAuthorizing}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg disabled:opacity-50"
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Processing Payment...</span>
          </div>
        ) : isAuthorizing ? (
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4" />
            <span>Redirecting to Bank...</span>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span>Pay £{totalAmount.toFixed(2)}</span>
            <span className="text-sm opacity-90">via Bank Transfer</span>
          </div>
        )}
      </Button>

      {!selectedBank && (
        <div className="text-center text-sm text-gray-500">
          Please select your bank to continue
        </div>
      )}
    </div>
  );
} 