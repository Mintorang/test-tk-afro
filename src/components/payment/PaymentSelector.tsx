'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Banknote, Smartphone, Square, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StripeCheckout } from './StripeCheckout';
import { GoCardlessPayment } from './GoCardlessPayment';
import { MobilePayment } from './MobilePayment';
import { SquarePayment } from './SquarePayment';
import { OpenBankingPayment } from './OpenBankingPayment';

type PaymentMethod = 'card' | 'bank' | 'mobile' | 'square' | 'openbanking';

interface PaymentSelectorProps {
  amount: number; // Amount in pence
  onSuccess: (paymentData: any, method: PaymentMethod) => void;
  onError: (error: any, method: PaymentMethod) => void;
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

export function PaymentSelector({
  amount,
  onSuccess,
  onError,
  customerDetails
}: PaymentSelectorProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    // Auto-select card payment as default for all browsers
    if (selectedMethod === null) {
      console.log('💳 Auto-selecting card payment as default');
      setSelectedMethod('card');
    }
  }, [selectedMethod]); // Auto-select card payment on load

  const bankTransferDiscount = Math.round(amount * 0.03); // 3% discount
  const bankTransferAmount = amount - bankTransferDiscount;

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      title: 'Card Payment',
      subtitle: 'Credit or Debit Card',
      icon: CreditCard,
      amount: amount,
      fees: 'Standard rate',
      benefits: ['Instant payment', 'Apple Pay & Google Pay', 'Most popular'],
      color: 'blue',
      popular: true,
      safariIssue: false,
      comingSoon: false,
      safariOptimized: false,
    },
    {
      id: 'openbanking' as PaymentMethod,
      title: 'Instant Bank Transfer',
      subtitle: 'Direct from your bank account',
      icon: Building2,
      amount: amount,
      fees: '0.3%',
      benefits: ['Lowest fees', 'Instant transfer', 'No card needed'],
      color: 'green',
      popular: false,
      safariIssue: false,
      comingSoon: false,
      safariOptimized: false,
      showFeeBreakdown: true,
      feeBreakdown: {
        baseAmount: amount - Math.round(amount * 0.003),
        openBankingFee: Math.round(amount * 0.003),
        platformFee: 0,
        totalAmount: amount
      }
    },
    {
      id: 'square' as PaymentMethod,
      title: 'Square Payment',
      subtitle: 'Fast & Secure Processing',
      icon: Square,
      amount: amount,
      fees: '1.9% + 20p',
      benefits: ['Same-day settlement', 'Lower fees', 'UK optimized'],
      color: 'orange',
      popular: false,
      safariIssue: false,
      comingSoon: false,
      safariOptimized: false,
      showFeeBreakdown: true,
      feeBreakdown: {
        baseAmount: amount - Math.round(amount * 0.019) - 20,
        squareFee: Math.round(amount * 0.019) + 20,
        platformFee: Math.round(amount * 0.005) + 10,
        totalAmount: amount
      }
    },
    {
      id: 'bank' as PaymentMethod,
      title: 'Bank Transfer',
      subtitle: 'Direct from your bank',
      icon: Banknote,
      amount: bankTransferAmount,
      fees: '3% discount',
      benefits: ['Lowest cost', 'Secure Direct Debit', 'No card fees'],
      color: 'green',
      savings: bankTransferDiscount,
      comingSoon: false,
      safariOptimized: false,
      safariIssue: false,
      popular: false,
    },
    {
      id: 'mobile' as PaymentMethod,
      title: 'Mobile Wallet',
      subtitle: 'Apple Pay / Google Pay',
      icon: Smartphone,
      amount: amount,
      fees: 'Standard rate',
      benefits: ['One-touch payment', 'Biometric security', 'Super fast'],
      color: 'purple',
      comingSoon: false, // Now enabled!
      safariOptimized: true,
      safariIssue: false,
      popular: false,
    },
  ];

  if (selectedMethod === 'card') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Card Payment</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>
        <StripeCheckout
          amount={amount}
          onSuccess={(data) => onSuccess(data, 'card')}
          onError={(error) => onError(error, 'card')}
          customerDetails={customerDetails}
        />
      </div>
    );
  }

  if (selectedMethod === 'bank') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Bank Transfer</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>
        <GoCardlessPayment
          amount={bankTransferAmount}
          onSuccess={(data) => onSuccess(data, 'bank')}
          onError={(error) => onError(error, 'bank')}
          customerDetails={customerDetails}
        />
      </div>
    );
  }

  if (selectedMethod === 'mobile') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Mobile Payment</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>
        <MobilePayment
          amount={amount}
          onSuccess={(data) => onSuccess(data, 'mobile')}
          onError={(error) => onError(error, 'mobile')}
          customerDetails={customerDetails}
        />
      </div>
    );
  }

  if (selectedMethod === 'square') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Square Payment</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>
        <SquarePayment
          amount={amount / 100} // Convert from pence to pounds for Square
          onSuccess={(data) => onSuccess(data, 'square')}
          onError={(error) => onError(error, 'square')}
          customerDetails={customerDetails}
          orderId={`order-${Date.now()}`}
        />
      </div>
    );
  }

  if (selectedMethod === 'openbanking') {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Instant Bank Transfer</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedMethod(null)}
          >
            Change Method
          </Button>
        </div>
        <OpenBankingPayment
          amount={amount / 100} // Convert from pence to pounds
          onSuccess={(data) => onSuccess(data, 'openbanking')}
          onError={(error) => onError(error, 'openbanking')}
          customerDetails={customerDetails}
          orderId={`order-${Date.now()}`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Choose Payment Method
        </h3>
        <p className="text-gray-600">
          Select your preferred way to pay
        </p>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isDisabled = method.comingSoon;
          const hasIssues = method.safariIssue;
          
          return (
            <button
              key={method.id}
              onClick={() => !isDisabled && setSelectedMethod(method.id)}
              disabled={isDisabled}
              className={`
                relative p-6 rounded-xl border-2 text-left transition-all duration-200
                ${isDisabled 
                  ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60' 
                  : hasIssues
                  ? 'border-yellow-200 bg-yellow-50 hover:border-yellow-300 cursor-pointer'
                  : `border-gray-200 hover:border-${method.color}-300 hover:bg-${method.color}-50 cursor-pointer`
                }
              `}
            >
              {method.popular && (
                <div className="absolute -top-2 left-4 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              
              {method.safariOptimized && isSafari && (
                <div className="absolute -top-2 left-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Safari Optimized
                </div>
              )}

              {hasIssues && (
                <div className="absolute -top-2 left-4 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  ⚠️ Safari Issues
                </div>
              )}
              
              {method.savings && (
                <div className="absolute -top-2 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                  Save £{(method.savings / 100).toFixed(2)}
                </div>
              )}

              {method.comingSoon && (
                <div className="absolute -top-2 right-4 bg-gray-400 text-white text-xs px-2 py-1 rounded-full">
                  Coming Soon
                </div>
              )}

              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg bg-${method.color}-100`}>
                  <Icon className={`w-6 h-6 text-${method.color}-600`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.subtitle}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-lg">
                        £{(method.amount / 100).toFixed(2)}
                      </div>
                      <div className={`text-sm ${method.savings ? 'text-green-600' : 'text-gray-500'}`}>
                        {method.fees}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {method.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded-full bg-${method.color}-100 text-${method.color}-700`}
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Fee Breakdown for Square */}
                  {method.showFeeBreakdown && method.feeBreakdown && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-xs font-medium text-gray-700 mb-2">Fee Breakdown:</div>
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span>Base Amount:</span>
                          <span>£{(method.feeBreakdown.baseAmount / 100).toFixed(2)}</span>
                        </div>
                        {method.feeBreakdown.squareFee && (
                          <div className="flex justify-between text-orange-600">
                            <span>Square Fee (1.9% + 20p):</span>
                            <span>£{(method.feeBreakdown.squareFee / 100).toFixed(2)}</span>
                          </div>
                        )}
                        {method.feeBreakdown.openBankingFee && (
                          <div className="flex justify-between text-green-600">
                            <span>Open Banking Fee (0.3%):</span>
                            <span>£{(method.feeBreakdown.openBankingFee / 100).toFixed(2)}</span>
                          </div>
                        )}
                        {method.feeBreakdown.platformFee && method.feeBreakdown.platformFee > 0 && (
                          <div className="flex justify-between text-blue-600">
                            <span>Platform Fee (0.5% + 10p):</span>
                            <span>£{(method.feeBreakdown.platformFee / 100).toFixed(2)}</span>
                          </div>
                        )}
                        <div className="border-t pt-1 flex justify-between font-medium">
                          <span>Total:</span>
                          <span>£{(method.feeBreakdown.totalAmount / 100).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>All payments are secured with 256-bit SSL encryption</p>
        <p>PCI DSS compliant • FCA regulated payment processors</p>
      </div>
    </div>
  );
}