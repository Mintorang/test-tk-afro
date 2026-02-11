import { NextRequest, NextResponse } from 'next/server';
import { sendPaymentFailedEmail } from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Payment failed API called');
    
    const body = await request.json();
    const { 
      orderId, 
      customerEmail, 
      customerName, 
      amount, 
      paymentMethod, 
      error 
    } = body;

    // Validate required fields
    if (!orderId || !customerEmail || !customerName) {
      return NextResponse.json(
        { error: 'Missing required fields: orderId, customerEmail, customerName' },
        { status: 400 }
      );
    }

    console.log(`📧 Processing payment failure notification for order ${orderId}`);

    // Send payment failed email to customer
    let emailSent = false;
    try {
      await sendPaymentFailedEmail({
        orderId,
        customerEmail,
        customerName,
        amount: amount || '0.00',
        status: 'Failed',
        items: [] // Could be enhanced to include actual order items
      });
      emailSent = true;
      console.log('✅ Payment failed email sent to customer');
    } catch (emailError) {
      console.error('❌ Payment failed email failed:', emailError);
    }

    // Log the payment failure for analysis
    console.log('📊 Payment failure logged:', {
      orderId,
      customerEmail,
      paymentMethod,
      error,
      timestamp: new Date().toISOString()
    });

    return NextResponse.json({
      success: true,
      emailSent,
      message: 'Payment failure processed successfully',
    });

  } catch (error: any) {
    console.error('❌ Payment failed API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to process payment failure',
        details: error.message,
      },
      { status: 500 }
    );
  }
} 