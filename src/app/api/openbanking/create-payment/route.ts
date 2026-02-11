import { NextRequest, NextResponse } from 'next/server';
import { 
  OPENBANKING_CONFIG, 
  formatAmountForOpenBanking, 
  calculateOpenBankingFees,
  handleOpenBankingError 
} from '@/lib/openbanking';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = 'GBP', customerDetails, orderId, bankId, clientId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!bankId) {
      return NextResponse.json(
        { error: 'Bank selection is required' },
        { status: 400 }
      );
    }

    // Calculate fees
    const fee = calculateOpenBankingFees(amount);
    const totalAmount = amount + fee;

    console.log('Creating Open Banking payment:', {
      amount,
      fee,
      totalAmount,
      bankId,
      orderId,
      clientId
    });

    // Create payment request for TrueLayer
    const paymentRequest = {
      amount: formatAmountForOpenBanking(totalAmount),
      currency: currency,
      payment_method: {
        type: 'bank_transfer',
        provider_selection: {
          type: 'preselected',
          provider_id: bankId
        },
        scheme_selection: {
          type: 'preselected',
          scheme_id: 'faster_payments_service'
        }
      },
      user: {
        id: customerDetails.email,
        name: customerDetails.name
      },
      metadata: {
        order_id: orderId,
        client_id: clientId,
        customer_email: customerDetails.email
      }
    };

    // Get TrueLayer access token
    const tokenResponse = await fetch('https://auth.truelayer.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: OPENBANKING_CONFIG.clientId,
        client_secret: OPENBANKING_CONFIG.clientSecret,
        scope: 'payments'
      })
    });

    const tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Failed to get TrueLayer token:', tokenResult);
      throw new Error('Failed to authenticate with Open Banking provider');
    }

    // Create payment with TrueLayer
    const paymentResponse = await fetch('https://api.truelayer.com/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenResult.access_token}`,
        'Content-Type': 'application/json',
        'Tl-Version': '2021-04-01'
      },
      body: JSON.stringify(paymentRequest)
    });

    const paymentResult = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('Failed to create Open Banking payment:', paymentResult);
      throw new Error(paymentResult.error || 'Failed to create payment');
    }

    console.log('Open Banking payment created successfully:', {
      paymentId: paymentResult.payment_id,
      status: paymentResult.status,
      amount: paymentResult.amount,
      orderId: orderId
    });

    // Store payment record (you would save this to your database)
    const paymentRecord = {
      id: paymentResult.payment_id,
      clientId: clientId,
      orderId: orderId,
      amount: amount,
      fee: fee,
      totalAmount: totalAmount,
      currency: currency,
      status: paymentResult.status,
      bankId: bankId,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      paymentId: paymentResult.payment_id,
      status: paymentResult.status,
      amount: amount,
      fee: fee,
      totalAmount: totalAmount,
      currency: currency,
      orderId: orderId,
      clientId: clientId,
      authorizationUrl: paymentResult.authorization_url,
      createdAt: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Open Banking payment creation error:', error);
    
    const errorResponse = handleOpenBankingError(error);
    
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