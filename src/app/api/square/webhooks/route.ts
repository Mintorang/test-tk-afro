import { NextRequest, NextResponse } from 'next/server';
import { SQUARE_WEBHOOK_EVENTS } from '@/lib/square';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-square-signature');
    const timestamp = request.headers.get('x-square-timestamp');

    // Verify webhook signature
    if (!signature || !timestamp) {
      console.error('Missing Square webhook signature or timestamp');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify webhook signature (you'll need to implement this based on Square's documentation)
    const isValidSignature = verifySquareWebhookSignature(
      body,
      signature,
      timestamp,
      process.env.SQUARE_WEBHOOK_SIGNATURE_KEY!
    );

    if (!isValidSignature) {
      console.error('Invalid Square webhook signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const event = JSON.parse(body);
    console.log('Square webhook received:', {
      type: event.type,
      paymentId: event.data?.id,
      orderId: event.data?.note
    });

    // Handle different webhook events
    switch (event.type) {
      case 'payment.created':
        await handlePaymentCreated(event.data);
        break;
      
      case 'payment.updated':
        await handlePaymentUpdated(event.data);
        break;
      
      case 'payment.completed':
        await handlePaymentCompleted(event.data);
        break;
      
      case 'payment.failed':
        await handlePaymentFailed(event.data);
        break;
      
      default:
        console.log('Unhandled Square webhook event:', event.type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Square webhook processing error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

// Verify Square webhook signature
function verifySquareWebhookSignature(
  body: string,
  signature: string,
  timestamp: string,
  signatureKey: string
): boolean {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + '/api/square/webhooks';
    const signatureString = url + body + timestamp;
    
    const hmac = crypto.createHmac('sha256', signatureKey);
    hmac.update(signatureString);
    const expectedSignature = hmac.digest('base64');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch (error) {
    console.error('Error verifying Square webhook signature:', error);
    return false;
  }
}

// Handle payment created event
async function handlePaymentCreated(paymentData: any) {
  console.log('Payment created:', paymentData.id);
  // You can add logic here to update order status
}

// Handle payment updated event
async function handlePaymentUpdated(paymentData: any) {
  console.log('Payment updated:', paymentData.id);
  // You can add logic here to update order status
}

// Handle payment completed event
async function handlePaymentCompleted(paymentData: any) {
  console.log('Payment completed:', paymentData.id);
  
  try {
    // Extract order ID from payment note
    const orderId = paymentData.note?.replace('TK Afro Kitchen Order: ', '');
    
    if (orderId) {
      // Send notification to kitchen
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notify-kitchen`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          amount: paymentData.amountMoney?.amount ? paymentData.amountMoney.amount / 100 : 0,
          paymentMethod: 'square',
          paymentId: paymentData.id,
          status: 'completed',
          timestamp: new Date().toISOString()
        }),
      });
      
      console.log('Kitchen notification sent for Square payment:', orderId);
    }
  } catch (error) {
    console.error('Error processing completed payment:', error);
  }
}

// Handle payment failed event
async function handlePaymentFailed(paymentData: any) {
  console.log('Payment failed:', paymentData.id);
  
  try {
    // Extract order ID from payment note
    const orderId = paymentData.note?.replace('TK Afro Kitchen Order: ', '');
    
    if (orderId) {
      // Send failure notification
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-failed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          paymentId: paymentData.id,
          paymentMethod: 'square',
          error: paymentData.failureReason || 'Payment failed',
          timestamp: new Date().toISOString()
        }),
      });
      
      console.log('Payment failure notification sent for Square payment:', orderId);
    }
  } catch (error) {
    console.error('Error processing failed payment:', error);
  }
} 