import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { sendOrderConfirmationEmail } from '@/lib/email-service';
import { sendOrderNotifications, sendPaymentNotifications } from '@/lib/mobile-notifications';
import { sendOrderPushNotification, sendPaymentPushNotification } from '@/lib/push-notifications';

// Kitchen staff email configuration
const KITCHEN_EMAILS = [
  'kitchen@tkafrokitchen.com',
  'chef@tkafrokitchen.com',
  // Add more kitchen staff emails here
];

// Email transporter setup
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Email notification
const sendEmailNotification = async (orderData: any) => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.log('⚠️ Email not configured - skipping email notifications');
    return;
  }

  const transporter = createEmailTransporter();

  const emailHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #f97316, #eab308); color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .order-info { background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .items-table { width: 100%; border-collapse: collapse; margin: 15px 0; }
        .items-table th, .items-table td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
        .items-table th { background-color: #f3f4f6; font-weight: bold; }
        .total { background: #fef3c7; padding: 10px; border-radius: 8px; font-weight: bold; font-size: 18px; }
        .urgent { background: #fee2e2; border-left: 4px solid #ef4444; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🍽️ NEW ORDER RECEIVED! 🍽️</h1>
          <p>Order ID: ${orderData.orderId}</p>
        </div>
        
        <div class="content">
          <div class="urgent">
            <strong>⏰ IMMEDIATE ACTION REQUIRED</strong><br>
            New order received at ${new Date(orderData.timestamp).toLocaleString('en-GB')}
          </div>
          
          <div class="order-info">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> ${orderData.customerInfo.fullName}</p>
            <p><strong>Phone:</strong> ${orderData.customerInfo.phone}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
            <p><strong>${orderData.fulfillmentType === 'delivery' ? 'Delivery Address:' : 'Collection:'}:</strong> ${orderData.fulfillmentType === 'delivery' && orderData.customerInfo.address ? 
              `${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.postcode}` : 
              '<strong>COLLECTION from Milton Keynes kitchen</strong>'}</p>
            <p><strong>Fulfillment Type:</strong> ${orderData.fulfillmentType === 'delivery' 
              ? `🚚 UK Delivery (£${orderData.deliveryFee?.toFixed(2) || '21.99'} fee)` 
              : '🏪 Collection (FREE)'}</p>
          </div>
          
          <h3>Order Items</h3>
          <table class="items-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Size</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${orderData.items.map((item: any) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.selectedSize.size}</td>
                  <td>${item.quantity}</td>
                  <td>£${item.price.toFixed(2)}</td>
                  <td>£${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="total">
            Subtotal: £${orderData.totalAmount}<br>
            ${orderData.fulfillmentType === 'delivery' ? `UK Delivery: £${orderData.deliveryFee?.toFixed(2) || '21.99'}` : 'Collection: FREE'}<br>
            <strong>Total: £${orderData.finalTotal || orderData.amount} (${orderData.paymentMethod.toUpperCase()})</strong>
          </div>
          
          <div class="order-info">
            <h3>Next Steps</h3>
            <ol>
              <li>Confirm receipt of this order</li>
              <li>Check ingredient availability</li>
              <li>Estimate preparation time</li>
              <li>Contact customer if any issues</li>
              <li>Begin food preparation</li>
              ${orderData.fulfillmentType === 'delivery' 
                ? '<li><strong>Arrange next-day delivery to customer address</strong></li>' 
                : '<li><strong>Notify customer when order is ready for collection</strong></li>'
              }
            </ol>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    for (const email of KITCHEN_EMAILS) {
      await transporter.sendMail({
        from: `"TK Afro Kitchen Orders" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `🚨 NEW ORDER #${orderData.orderId} - £${orderData.amount} - ${orderData.customerInfo.fullName}`,
        html: emailHTML,
        text: `NEW ORDER RECEIVED
        
Order ID: ${orderData.orderId}
Customer: ${orderData.customerInfo.fullName}
Phone: ${orderData.customerInfo.phone}
Fulfillment: ${orderData.fulfillmentType === 'delivery' ? 'UK Delivery' : 'Collection'}
${orderData.fulfillmentType === 'delivery' && orderData.customerInfo.address ? 
  `Address: ${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.postcode}` : 
  'Collection from Milton Keynes kitchen'}

Items:
${orderData.items.map((item: any) => 
  `${item.quantity}x ${item.name} (${item.selectedSize.size}) - £${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

Subtotal: £${orderData.totalAmount}
${orderData.fulfillmentType === 'delivery' ? `Delivery: £${orderData.deliveryFee?.toFixed(2) || '21.99'}` : 'Collection: FREE'}
TOTAL: £${orderData.finalTotal || orderData.amount}
Payment: ${orderData.paymentMethod}

Time: ${new Date(orderData.timestamp).toLocaleString('en-GB')}`,
      });
      console.log(`✅ Email sent to ${email}`);
    }
  } catch (error) {
    console.error('❌ Email notification failed:', error);
  }
};

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Kitchen notification API called');
    
    const orderData = await request.json();
    
    // Validate required fields
    if (!orderData.orderId || !orderData.amount || !orderData.customerInfo) {
      return NextResponse.json(
        { error: 'Missing required order data' },
        { status: 400 }
      );
    }

    console.log(`📋 Processing kitchen notification for order ${orderData.orderId}`);

    // Send customer confirmation email
    let customerEmailSent = false;
    try {
      await sendOrderConfirmationEmail({
        orderId: orderData.orderId,
        customerEmail: orderData.customerInfo.email,
        customerName: orderData.customerInfo.fullName,
        amount: (orderData.finalTotal || orderData.amount).toString(),
        status: 'Completed',
        items: orderData.items.map((item: any) => ({
          name: `${item.name} (${item.selectedSize.size})`,
          quantity: item.quantity,
          price: (item.price * item.quantity).toFixed(2)
        }))
      });
      customerEmailSent = true;
      console.log('✅ Customer confirmation email sent');
    } catch (customerEmailError) {
      console.error('❌ Customer confirmation email failed:', customerEmailError);
    }

    // Send all notifications in parallel
    const notifications = await Promise.allSettled([
      sendEmailNotification(orderData),
      sendOrderNotifications(orderData), // Mobile notifications (SMS/WhatsApp)
      sendOrderPushNotification(orderData), // Push notifications (ntfy.sh)
    ]);

    const emailResult = notifications[0];
    const mobileResult = notifications[1];
    const pushResult = notifications[2];

    console.log('📧 Email notification:', emailResult.status);
    console.log('📱 Mobile notification:', mobileResult.status);
    console.log('🔔 Push notification:', pushResult.status);

    // Send payment notification separately
    let paymentNotificationSent = false;
    let paymentPushNotificationSent = false;
    try {
      const paymentData = {
        orderId: orderData.orderId,
        customerInfo: orderData.customerInfo,
        amount: orderData.finalTotal || orderData.amount,
        paymentMethod: orderData.paymentMethod,
        status: 'success' as const,
        timestamp: orderData.timestamp,
        transactionId: orderData.transactionId
      };
      
      const [paymentResult, paymentPushResult] = await Promise.allSettled([
        sendPaymentNotifications(paymentData),
        sendPaymentPushNotification(paymentData)
      ]);
      
      paymentNotificationSent = paymentResult.status === 'fulfilled' && paymentResult.value.success;
      paymentPushNotificationSent = paymentPushResult.status === 'fulfilled' && paymentPushResult.value.success;
      
      console.log('💰 Payment notification sent:', paymentNotificationSent);
      console.log('🔔 Payment push notification sent:', paymentPushNotificationSent);
    } catch (paymentError) {
      console.error('❌ Payment notification failed:', paymentError);
    }

    return NextResponse.json({
      success: true,
      notifications: {
        customerEmail: customerEmailSent,
        kitchenEmail: emailResult.status === 'fulfilled',
        mobileNotifications: mobileResult.status === 'fulfilled' ? mobileResult.value : null,
        pushNotification: pushResult.status === 'fulfilled' ? pushResult.value : null,
        paymentNotification: paymentNotificationSent,
        paymentPushNotification: paymentPushNotificationSent,
      },
      message: 'All notifications sent successfully',
    });

  } catch (error: any) {
    console.error('❌ Kitchen notification error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to send kitchen notifications',
        details: error.message,
      },
      { status: 500 }
    );
  }
}