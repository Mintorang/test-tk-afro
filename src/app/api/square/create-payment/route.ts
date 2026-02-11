import { NextRequest, NextResponse } from 'next/server';
import { SQUARE_CONFIG, formatAmountForSquare, formatAmountFromSquare, handleSquareError } from '@/lib/square';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sourceId, amount, currency = 'GBP', customerDetails, orderId, verificationToken, clientId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!sourceId) {
      return NextResponse.json(
        { error: 'Payment source ID is required' },
        { status: 400 }
      );
    }

    if (!clientId) {
      return NextResponse.json(
        { error: 'Client ID is required' },
        { status: 400 }
      );
    }

    // Get client account data (you would fetch this from your database)
    const clientAccount = await getClientAccount(clientId);
    
    if (!clientAccount || clientAccount.status !== 'active') {
      return NextResponse.json(
        { error: 'Client account not found or inactive' },
        { status: 400 }
      );
    }

    // Create payment request using client's Square account
    const paymentRequest = {
      source_id: sourceId,
      idempotency_key: `${clientId}-${orderId}-${Date.now()}`,
      amount_money: {
        amount: formatAmountForSquare(amount),
        currency: currency
      },
      location_id: clientAccount.locationId || SQUARE_CONFIG.platformLocationId,
      note: `TK Afro Kitchen Order: ${orderId} (${clientAccount.businessName})`,
      billing_address: customerDetails?.address ? {
        address_line_1: customerDetails.address,
        locality: customerDetails.city,
        postal_code: customerDetails.postcode,
        country: 'GB'
      } : undefined,
      shipping_address: customerDetails?.address ? {
        address_line_1: customerDetails.address,
        locality: customerDetails.city,
        postal_code: customerDetails.postcode,
        country: 'GB'
      } : undefined,
      receipt_email: customerDetails?.email,
      receipt_url: `${process.env.NEXT_PUBLIC_BASE_URL}/order-confirmation?orderId=${orderId}&clientId=${clientId}`,
      verification_token: verificationToken
    };

    console.log('Creating Square payment for client:', {
      clientId,
      businessName: clientAccount.businessName,
      amount: paymentRequest.amount_money.amount,
      currency: paymentRequest.amount_money.currency,
      orderId: orderId
    });

    // Create the payment using client's access token
    const response = await fetch(`https://connect.squareup.com/v2/payments`, {
      method: 'POST',
      headers: {
        'Square-Version': '2024-01-17',
        'Authorization': `Bearer ${clientAccount.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentRequest)
    });

    const result = await response.json();

    if (response.ok && result.payment) {
      const payment = result.payment;
      
      console.log('Square payment created successfully for client:', {
        clientId,
        businessName: clientAccount.businessName,
        paymentId: payment.id,
        status: payment.status,
        amount: payment.amount_money?.amount,
        orderId: orderId
      });

      // Store payment record (you would save this to your database)
      const paymentRecord = {
        id: payment.id,
        clientId: clientId,
        orderId: orderId,
        amount: payment.amount_money?.amount ? formatAmountFromSquare(payment.amount_money.amount) : amount,
        currency: payment.amount_money?.currency || currency,
        status: payment.status,
        createdAt: payment.created_at,
        businessName: clientAccount.businessName
      };

      return NextResponse.json({
        success: true,
        paymentId: payment.id,
        status: payment.status,
        amount: payment.amount_money?.amount ? formatAmountFromSquare(payment.amount_money.amount) : amount,
        currency: payment.amount_money?.currency || currency,
        orderId: orderId,
        clientId: clientId,
        businessName: clientAccount.businessName,
        receiptUrl: payment.receipt_url,
        createdAt: payment.created_at
      });
    } else {
      throw new Error(result.errors?.[0]?.detail || 'Payment creation failed');
    }

  } catch (error: any) {
    console.error('Square payment creation error:', error);
    
    const errorResponse = handleSquareError(error);
    
    return NextResponse.json(
      { 
        success: false,
        error: errorResponse.error,
        code: errorResponse.code
      },
      { status: 400 }
    );
  }
}

// Helper function to get client account (you would implement this with your database)
async function getClientAccount(clientId: string) {
  // This is a placeholder - you would fetch from your database
  // For now, return a mock client account
  return {
    id: clientId,
    businessName: 'TK Afro Kitchen',
    email: 'chef@tkafrokitchen.com',
    phone: '07946544843',
    locationId: process.env.SQUARE_PLATFORM_LOCATION_ID,
    accessToken: process.env.SQUARE_PLATFORM_ACCESS_TOKEN,
    status: 'active' as const,
    bankAccountId: 'mock-bank-account',
    settlementSchedule: 'same_day' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
} 