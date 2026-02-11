// Open Banking (TrueLayer) configuration for instant bank transfers
export const OPENBANKING_CONFIG = {
  // TrueLayer credentials
  clientId: process.env.TRUELAYER_CLIENT_ID!,
  clientSecret: process.env.TRUELAYER_CLIENT_SECRET!,
  redirectUri: process.env.TRUELAYER_REDIRECT_URI!,
  
  // Environment
  environment: process.env.NODE_ENV === 'production' ? 'live' : 'sandbox',
  
  // Default settings
  currency: 'GBP',
  country: 'GB',
  
  // Fee structure
  fees: {
    percentage: 0.003, // 0.3%
    fixed: 0, // No fixed fee
    minimum: 0.10, // Minimum 10p
    maximum: 5.00 // Maximum £5
  }
};

// Supported UK banks for Open Banking
export const SUPPORTED_BANKS = [
  'Barclays',
  'HSBC',
  'Lloyds',
  'NatWest',
  'RBS',
  'Santander',
  'TSB',
  'Nationwide',
  'First Direct',
  'Halifax',
  'Monzo',
  'Revolut',
  'Starling',
  'Chase',
  'Virgin Money'
];

// Open Banking payment status
export type PaymentStatus = 
  | 'pending'
  | 'authorized'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled';

// Open Banking payment interface
export interface OpenBankingPayment {
  id: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  bankId: string;
  bankName: string;
  customerName: string;
  reference: string;
  createdAt: string;
  completedAt?: string;
  failureReason?: string;
}

// Helper function to calculate Open Banking fees
export const calculateOpenBankingFees = (amount: number): number => {
  const percentageFee = amount * OPENBANKING_CONFIG.fees.percentage;
  const totalFee = Math.max(
    OPENBANKING_CONFIG.fees.minimum,
    Math.min(percentageFee, OPENBANKING_CONFIG.fees.maximum)
  );
  return Math.round(totalFee * 100) / 100; // Round to 2 decimal places
};

// Helper function to format amount for Open Banking (in pence)
export const formatAmountForOpenBanking = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format amount from Open Banking (from pence)
export const formatAmountFromOpenBanking = (amount: number): number => {
  return amount / 100;
};

// Open Banking error handling
export const handleOpenBankingError = (error: any) => {
  console.error('Open Banking API Error:', error);
  
  if (error.response?.data?.error) {
    return {
      success: false,
      error: error.response.data.error,
      code: error.response.data.error_code || 'UNKNOWN_ERROR'
    };
  }
  
  return {
    success: false,
    error: 'Open Banking payment failed',
    code: 'UNKNOWN_ERROR'
  };
}; 