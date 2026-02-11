import { NextRequest, NextResponse } from 'next/server';
import { 
  sendOrderNotifications, 
  sendPaymentNotifications, 
  sendUrgentNotification,
  testMobileNotifications 
} from '@/lib/mobile-notifications';

export async function POST(request: NextRequest) {
  try {
    console.log('📱 Mobile notification API called');
    
    const body = await request.json();
    const { type, data, testMode = false } = body;

    if (testMode) {
      console.log('🧪 Running mobile notification test...');
      const testResults = await testMobileNotifications();
      
      return NextResponse.json({
        success: true,
        message: 'Mobile notification test completed',
        results: testResults,
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

        console.log(`📱 Sending order notification for ${data.orderId}`);
        const orderResult = await sendOrderNotifications(data);
        
        return NextResponse.json({
          success: orderResult.success,
          message: 'Order notifications sent',
          results: orderResult,
          timestamp: new Date().toISOString()
        });

      case 'payment':
        if (!data.orderId || !data.customerInfo || !data.amount) {
          return NextResponse.json(
            { error: 'Missing required payment data' },
            { status: 400 }
          );
        }

        console.log(`💰 Sending payment notification for ${data.orderId}`);
        const paymentResult = await sendPaymentNotifications(data);
        
        return NextResponse.json({
          success: paymentResult.success,
          message: 'Payment notifications sent',
          results: paymentResult,
          timestamp: new Date().toISOString()
        });

      case 'urgent':
        if (!data.message) {
          return NextResponse.json(
            { error: 'Missing urgent message' },
            { status: 400 }
          );
        }

        console.log(`🚨 Sending urgent notification: ${data.message}`);
        const urgentResult = await sendUrgentNotification(data.message, data.type);
        
        return NextResponse.json({
          success: urgentResult.success,
          message: 'Urgent notification sent',
          results: urgentResult,
          timestamp: new Date().toISOString()
        });

      default:
        return NextResponse.json(
          { error: 'Invalid notification type. Use: order, payment, or urgent' },
          { status: 400 }
        );
    }

  } catch (error: any) {
    console.error('❌ Mobile notification error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send mobile notifications',
        details: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Mobile Notifications API',
    endpoints: {
      'POST /api/mobile-notifications': 'Send mobile notifications',
      'GET /api/mobile-notifications': 'API information'
    },
    notificationTypes: {
      order: 'Send order notifications to kitchen staff',
      payment: 'Send payment notifications to manager',
      urgent: 'Send urgent notifications to primary staff'
    },
    testMode: 'Add { "testMode": true } to test notifications'
  });
} 