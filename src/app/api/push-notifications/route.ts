import { NextRequest, NextResponse } from 'next/server';
import { 
  sendOrderPushNotification, 
  sendPaymentPushNotification, 
  sendUrgentPushNotification,
  sendSimpleNotification,
  sendCustomerMessageNotification,
  testPushNotifications 
} from '@/lib/push-notifications';

export async function POST(request: NextRequest) {
  try {
    console.log('📱 Push notification API called');
    
    const body = await request.json();
    const { type, data, testMode = false, title, message, priority } = body;

    if (testMode) {
      console.log('🧪 Running push notification test...');
      const testResults = await testPushNotifications();
      
      return NextResponse.json({
        success: true,
        message: 'Push notification test completed',
        results: testResults,
        timestamp: new Date().toISOString()
      });
    }

    // Simple notification
    if (title && message) {
      const result = await sendSimpleNotification(title, message, priority);
      return NextResponse.json({
        success: result.success,
        message: 'Simple notification sent',
        result,
        timestamp: new Date().toISOString()
      });
    }

    switch (type) {
      case 'order':
        if (!data.orderId || !data.customerInfo || !data.items) {
          return NextResponse.json(
            { error: 'Missing required order data' },
            { status: 400 }
          );
        }

        console.log(`📱 Sending order push notification for ${data.orderId}`);
        const orderResult = await sendOrderPushNotification(data);
        
        return NextResponse.json({
          success: orderResult.success,
          message: 'Order push notification sent',
          result: orderResult,
          timestamp: new Date().toISOString()
        });

      case 'payment':
        if (!data.orderId || !data.customerInfo || !data.amount) {
          return NextResponse.json(
            { error: 'Missing required payment data' },
            { status: 400 }
          );
        }

        console.log(`💰 Sending payment push notification for ${data.orderId}`);
        const paymentResult = await sendPaymentPushNotification(data);
        
        return NextResponse.json({
          success: paymentResult.success,
          message: 'Payment push notification sent',
          result: paymentResult,
          timestamp: new Date().toISOString()
        });

      case 'customer-message':
        if (!data.customerInfo || !data.subject || !data.message) {
          return NextResponse.json(
            { error: 'Missing required customer message data' },
            { status: 400 }
          );
        }

        console.log(`📧 Sending customer message push notification from ${data.customerInfo.email}`);
        const customerMessageResult = await sendCustomerMessageNotification(data);
        
        return NextResponse.json({
          success: customerMessageResult.success,
          message: 'Customer message push notification sent',
          result: customerMessageResult,
          timestamp: new Date().toISOString()
        });

      case 'urgent':
        if (!data.message) {
          return NextResponse.json(
            { error: 'Missing urgent message' },
            { status: 400 }
          );
        }

        console.log(`🚨 Sending urgent push notification: ${data.message}`);
        const urgentResult = await sendUrgentPushNotification(data.message, data.type);
        
        return NextResponse.json({
          success: urgentResult.success,
          message: 'Urgent push notification sent',
          result: urgentResult,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid notification type. Use: order, payment, customer-message, urgent, or provide title/message' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('❌ Push notification error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send push notification',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Push Notifications API (ntfy.sh)',
    endpoints: {
      'POST /api/push-notifications': 'Send push notifications',
      'GET /api/push-notifications': 'API information'
    },
    notificationTypes: {
      order: 'Send order notifications',
      payment: 'Send payment notifications',
      'customer-message': 'Send customer message notifications',
      urgent: 'Send urgent notifications',
      simple: 'Send simple notification with title and message'
    },
    testMode: 'Add { "testMode": true } to test notifications',
    simpleNotification: 'Add { "title": "...", "message": "..." } for simple notifications',
    setup: 'Set NTFY_TOPIC environment variable to your ntfy.sh topic'
  });
} 