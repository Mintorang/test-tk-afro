import { NextRequest, NextResponse } from 'next/server';
import { 
  sendOrderConfirmationEmail, 
  sendPaymentFailedEmail, 
  sendKitchenNotificationEmail 
} from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Testing email flow API called');
    
    const body = await request.json();
    const { testType = 'success', customerEmail } = body;

    if (!customerEmail) {
      return NextResponse.json(
        { error: 'customerEmail is required for testing' },
        { status: 400 }
      );
    }

    const testOrderId = `test_${Date.now()}`;
    const testCustomerName = 'Test Customer';
    const testAmount = '25.99';
    const testItems = [
      { name: 'Test Dish 1', quantity: 2, price: '12.99' },
      { name: 'Test Dish 2', quantity: 1, price: '13.00' }
    ];

    let results: Record<string, any> = {};

    switch (testType) {
      case 'success':
        console.log('✅ Testing successful payment email flow');
        
        // Test order confirmation email
        try {
          const confirmationResult = await sendOrderConfirmationEmail({
            orderId: testOrderId,
            customerEmail,
            customerName: testCustomerName,
            amount: testAmount,
            status: 'Completed',
            items: testItems
          });
          results.confirmationEmail = { success: true, messageId: confirmationResult.messageId };
          console.log('✅ Order confirmation email sent successfully');
        } catch (error: any) {
          results.confirmationEmail = { success: false, error: error.message };
          console.error('❌ Order confirmation email failed:', error);
        }

        // Test kitchen notification email
        try {
          const kitchenResult = await sendKitchenNotificationEmail({
            orderId: testOrderId,
            customerEmail: '',
            customerName: testCustomerName,
            amount: testAmount,
            status: 'Completed',
            items: testItems
          });
          results.kitchenEmail = { success: true, messageId: kitchenResult.messageId };
          console.log('✅ Kitchen notification email sent successfully');
        } catch (error: any) {
          results.kitchenEmail = { success: false, error: error.message };
          console.error('❌ Kitchen notification email failed:', error);
        }
        break;

      case 'failure':
        console.log('❌ Testing payment failure email flow');
        
        try {
          const failureResult = await sendPaymentFailedEmail({
            orderId: testOrderId,
            customerEmail,
            customerName: testCustomerName,
            amount: testAmount,
            status: 'Failed',
            items: testItems
          });
          results.failureEmail = { success: true, messageId: failureResult.messageId };
          console.log('✅ Payment failed email sent successfully');
        } catch (error: any) {
          results.failureEmail = { success: false, error: error.message };
          console.error('❌ Payment failed email failed:', error);
        }
        break;

      case 'all':
        console.log('🔄 Testing all email flows');
        
        // Test all email types
        const emailTests = [
          {
            name: 'confirmation',
            test: () => sendOrderConfirmationEmail({
              orderId: testOrderId,
              customerEmail,
              customerName: testCustomerName,
              amount: testAmount,
              status: 'Completed',
              items: testItems
            })
          },
          {
            name: 'kitchen',
            test: () => sendKitchenNotificationEmail({
              orderId: testOrderId,
              customerEmail: '',
              customerName: testCustomerName,
              amount: testAmount,
              status: 'Completed',
              items: testItems
            })
          },
          {
            name: 'failure',
            test: () => sendPaymentFailedEmail({
              orderId: testOrderId,
              customerEmail,
              customerName: testCustomerName,
              amount: testAmount,
              status: 'Failed',
              items: testItems
            })
          }
        ];

        for (const emailTest of emailTests) {
          try {
            const result = await emailTest.test();
            results[emailTest.name] = { success: true, messageId: result.messageId };
            console.log(`✅ ${emailTest.name} email sent successfully`);
          } catch (error: any) {
            results[emailTest.name] = { success: false, error: error.message };
            console.error(`❌ ${emailTest.name} email failed:`, error);
          }
        }
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid testType. Use: success, failure, or all' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      testType,
      customerEmail,
      orderId: testOrderId,
      results,
      message: `Email flow test completed for ${testType}`,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Email flow test error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to test email flow',
        details: error.message,
      },
      { status: 500 }
    );
  }
} 