// Square Connect configuration for multi-tenant platform
export const SQUARE_CONFIG = {
  // Your main Square account (platform account)
  platformLocationId: process.env.SQUARE_PLATFORM_LOCATION_ID!,
  platformAccessToken: process.env.SQUARE_PLATFORM_ACCESS_TOKEN!,
  platformAppId: process.env.SQUARE_PLATFORM_APP_ID!,
  
  // Default settings
  currency: 'GBP',
  country: 'GB',
  
  // Connect settings
  connectWebhookUrl: process.env.SQUARE_CONNECT_WEBHOOK_URL!,
  connectRedirectUrl: process.env.SQUARE_CONNECT_REDIRECT_URL!,
  
  // Fee visibility settings
  showFeeBreakdown: process.env.SHOW_FEE_BREAKDOWN === 'true', // Set to 'true' to show fees
  hidePlatformFee: process.env.HIDE_PLATFORM_FEE === 'true', // Set to 'true' to hide your platform fee
};

// Client account management
export interface ClientAccount {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  locationId: string;
  accessToken: string;
  status: 'active' | 'pending' | 'suspended';
  bankAccountId: string;
  settlementSchedule: 'same_day' | 'next_day' | 'weekly';
  createdAt: string;
  updatedAt: string;
  
  // Fee settings
  showFeeBreakdown: boolean;
  hidePlatformFee: boolean;
  customFeeMessage?: string;
}

// Payment methods supported
export const SUPPORTED_PAYMENT_METHODS = [
  'CARD',
  'CASH_APP_PAY',
  'BANK_TRANSFER',
];

// Square webhook events to handle
export const SQUARE_WEBHOOK_EVENTS = [
  'payment.created',
  'payment.updated',
  'payment.completed',
  'payment.failed',
  'merchant.created',
  'merchant.updated',
  'merchant.deleted',
];

// Helper function to format amount for Square (in pence)
export const formatAmountForSquare = (amount: number): number => {
  return Math.round(amount * 100);
};

// Helper function to format amount from Square (from pence)
export const formatAmountFromSquare = (amount: number): number => {
  return amount / 100;
};

// Square Connect onboarding helper
export const createSquareConnectLink = async (clientId: string, businessName: string) => {
  try {
    const response = await fetch('https://connect.squareup.com/v2/oauth2/authorize', {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-17',
        'Authorization': `Bearer ${SQUARE_CONFIG.platformAccessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: SQUARE_CONFIG.platformAppId,
        response_type: 'code',
        scope: 'MERCHANT_PROFILE_READ PAYMENTS_READ PAYMENTS_WRITE',
        state: clientId,
        redirect_uri: SQUARE_CONFIG.connectRedirectUrl,
        session: false
      })
    });

    const result = await response.json();
    return result.authorization_url;
  } catch (error) {
    console.error('Error creating Square Connect link:', error);
    throw error;
  }
};

// Square error handling
export const handleSquareError = (error: any) => {
  console.error('Square API Error:', error);
  
  if (error.result?.errors) {
    return {
      success: false,
      error: error.result.errors[0]?.detail || 'Payment processing failed',
      code: error.result.errors[0]?.code || 'UNKNOWN_ERROR'
    };
  }
  
  return {
    success: false,
    error: 'Payment processing failed',
    code: 'UNKNOWN_ERROR'
  };
}; 