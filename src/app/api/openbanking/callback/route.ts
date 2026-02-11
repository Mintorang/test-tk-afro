import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('payment_id');
    const status = searchParams.get('status');
    const error = searchParams.get('error');

    console.log('Open Banking callback received:', {
      paymentId,
      status,
      error
    });

    if (error) {
      console.error('Open Banking payment error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=openbanking_failed&message=${encodeURIComponent(error)}`
      );
    }

    if (!paymentId || !status) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=missing_payment_info`
      );
    }

    // Check payment status with TrueLayer
    const tokenResponse = await fetch('https://auth.truelayer.com/connect/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.TRUELAYER_CLIENT_ID!,
        client_secret: process.env.TRUELAYER_CLIENT_SECRET!,
        scope: 'payments'
      })
    });

    const tokenResult = await tokenResponse.json();

    if (!tokenResponse.ok) {
      console.error('Failed to get TrueLayer token:', tokenResult);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=authentication_failed`
      );
    }

    // Get payment details
    const paymentResponse = await fetch(`https://api.truelayer.com/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${tokenResult.access_token}`,
        'Tl-Version': '2021-04-01'
      }
    });

    const paymentResult = await paymentResponse.json();

    if (!paymentResponse.ok) {
      console.error('Failed to get payment details:', paymentResult);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=payment_lookup_failed`
      );
    }

    console.log('Payment details retrieved:', {
      paymentId: paymentResult.payment_id,
      status: paymentResult.status,
      amount: paymentResult.amount,
      currency: paymentResult.currency
    });

    // Handle different payment statuses
    switch (paymentResult.status) {
      case 'authorized':
      case 'executed':
        // Payment successful
        console.log('Open Banking payment successful:', paymentId);
        
        // Send success notification to kitchen
        try {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/api/notify-kitchen`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: paymentResult.metadata?.order_id || paymentId,
              amount: (paymentResult.amount / 100).toFixed(2),
              paymentMethod: 'openbanking',
              paymentId: paymentId,
              status: 'completed',
              timestamp: new Date().toISOString()
            }),
          });
        } catch (notificationError) {
          console.error('Kitchen notification failed:', notificationError);
        }

        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/success?orderId=${paymentResult.metadata?.order_id || paymentId}&method=openbanking&amount=${(paymentResult.amount / 100).toFixed(2)}`
        );

      case 'failed':
        console.error('Open Banking payment failed:', paymentResult.failure_reason);
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=payment_failed&message=${encodeURIComponent(paymentResult.failure_reason || 'Payment failed')}`
        );

      case 'cancelled':
        console.log('Open Banking payment cancelled by user');
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=payment_cancelled`
        );

      default:
        console.log('Open Banking payment pending:', paymentResult.status);
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=payment_pending&status=${paymentResult.status}`
        );
    }

  } catch (error: any) {
    console.error('Open Banking callback error:', error);
    
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'https://tkafrokitchen.com'}/checkout?error=callback_failed&message=${encodeURIComponent(error.message || 'Unknown error')}`
    );
  }
} 