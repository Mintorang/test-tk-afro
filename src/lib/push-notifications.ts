// Push Notifications using ntfy.sh
// Simple, free, and reliable push notifications to your phone

interface OrderNotificationData {
  orderId: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
    address?: string;
    city?: string;
    postcode?: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    selectedSize: {
      size: string;
      price: number;
    };
  }>;
  totalAmount: number;
  finalTotal: number;
  deliveryFee?: number;
  fulfillmentType: 'delivery' | 'collection';
  paymentMethod: string;
  timestamp: string;
}

interface PaymentNotificationData {
  orderId: string;
  customerInfo: {
    fullName: string;
    phone: string;
    email: string;
  };
  amount: number;
  paymentMethod: string;
  status: 'success' | 'failed' | 'pending';
  timestamp: string;
  transactionId?: string;
}

interface CustomerMessageData {
  customerInfo: {
    fullName: string;
    email: string;
    phone?: string;
  };
  subject: string;
  message: string;
  timestamp: string;
  source: 'contact-form' | 'email' | 'whatsapp' | 'phone';
}

// ntfy.sh configuration
const NTFY_TOPIC = process.env.NTFY_TOPIC || 'tk-afro-kitchen';
const NTFY_BASE_URL = 'https://ntfy.sh';

// Send push notification using ntfy.sh
export const sendPushNotification = async (
  title: string,
  message: string,
  priority: '1' | '2' | '3' | '4' | '5' = '3',
  tags?: string[]
) => {
  if (!NTFY_TOPIC) {
    console.warn('⚠️ NTFY_TOPIC not configured - skipping push notification');
    return { success: false, error: 'NTFY_TOPIC not configured' };
  }

  try {
    const url = `${NTFY_BASE_URL}/${NTFY_TOPIC}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'text/plain; charset=utf-8',
      'Title': title,
      'Priority': priority,
    };

    if (tags && tags.length > 0) {
      headers['Tags'] = tags.join(',');
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: message,
    });

    if (response.ok) {
      console.log(`✅ Push notification sent: ${title}`);
      return { success: true, messageId: response.headers.get('X-Message-ID') };
    } else {
      console.error(`❌ Push notification failed: ${response.status} ${response.statusText}`);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error: any) {
    console.error('❌ Push notification error:', error);
    return { success: false, error: error.message };
  }
};

// Send order notification
export const sendOrderPushNotification = async (orderData: OrderNotificationData) => {
  const fulfillmentEmoji = orderData.fulfillmentType === 'delivery' ? 'DELIVERY' : 'COLLECTION';
  const fulfillmentText = orderData.fulfillmentType === 'delivery' 
    ? `DELIVERY (£${orderData.deliveryFee?.toFixed(2) || '24.99'} fee)`
    : 'COLLECTION (FREE)';

  const title = `NEW ORDER #${orderData.orderId}`;
  
  const message = `💰 £${orderData.finalTotal} - ${orderData.customerInfo.fullName}
📞 ${orderData.customerInfo.phone}
${fulfillmentEmoji} ${fulfillmentText}
⏰ ${new Date(orderData.timestamp).toLocaleTimeString('en-GB')}

ITEMS:
${orderData.items.map(item => 
  `• ${item.quantity}x ${item.name} (${item.selectedSize.size}) - £${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

Subtotal: £${orderData.totalAmount}
${orderData.fulfillmentType === 'delivery' ? `Delivery: £${orderData.deliveryFee?.toFixed(2) || '24.99'}` : 'Collection: FREE'}
TOTAL: £${orderData.finalTotal}
Payment: ${orderData.paymentMethod}

${orderData.fulfillmentType === 'delivery' && orderData.customerInfo.address ? 
  `📍 ${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.postcode}` : 
  '📍 COLLECTION from Milton Keynes kitchen'}`;

  return await sendPushNotification(
    title,
    message,
    '4', // High priority for orders
    ['restaurant', 'order', 'money', 'bell']
  );
};

// Send payment notification
export const sendPaymentPushNotification = async (paymentData: PaymentNotificationData) => {
  const statusEmoji = {
    success: 'SUCCESS',
    failed: 'FAILED',
    pending: 'PENDING'
  };

  const statusText = {
    success: 'PAYMENT SUCCESSFUL',
    failed: 'PAYMENT FAILED',
    pending: 'PAYMENT PENDING'
  };

  const title = `${statusEmoji[paymentData.status]} ${statusText[paymentData.status]}`;
  
  const message = `Order #${paymentData.orderId}
💰 £${paymentData.amount}
👤 ${paymentData.customerInfo.fullName}
📞 ${paymentData.customerInfo.phone}
💳 ${paymentData.paymentMethod}
⏰ ${new Date(paymentData.timestamp).toLocaleTimeString('en-GB')}
${paymentData.transactionId ? `🔗 ${paymentData.transactionId}` : ''}

${paymentData.status === 'success' ? '✅ Order confirmed and ready for preparation' : 
  paymentData.status === 'failed' ? '❌ Payment failed - manual intervention required' :
  '⏳ Payment processing - monitor for completion'}`;

  return await sendPushNotification(
    title,
    message,
    paymentData.status === 'failed' ? '5' : '3', // Urgent for failed payments
    ['money', 'payment', 'credit-card', 'bell']
  );
};

// Send customer message notification
export const sendCustomerMessageNotification = async (messageData: CustomerMessageData) => {
  const sourceEmoji = {
    'contact-form': '📝',
    'email': '📧',
    'whatsapp': '💬',
    'phone': '📞'
  };

  const title = `CUSTOMER MESSAGE - ${messageData.source.toUpperCase()}`;
  
  const message = `👤 ${messageData.customerInfo.fullName}
📧 ${messageData.customerInfo.email}
${messageData.customerInfo.phone ? `📞 ${messageData.customerInfo.phone}` : ''}
⏰ ${new Date(messageData.timestamp).toLocaleTimeString('en-GB')}

SUBJECT: ${messageData.subject}

MESSAGE:
${messageData.message}

${sourceEmoji[messageData.source]} Sent via ${messageData.source.replace('-', ' ')}`;

  return await sendPushNotification(
    title,
    message,
    '4', // High priority for customer messages
    ['message', 'customer', 'envelope', 'bell']
  );
};

// Send urgent notification
export const sendUrgentPushNotification = async (
  message: string,
  type: 'order' | 'payment' | 'system' | 'customer' = 'system'
) => {
  const title = `URGENT: ${type.toUpperCase()}`;
  
  const fullMessage = `${message}
⏰ ${new Date().toLocaleString('en-GB')}
🔔 Immediate action required`;

  return await sendPushNotification(
    title,
    fullMessage,
    '5', // Highest priority for urgent notifications
    ['warning', 'urgent', 'bell', 'rotating-light']
  );
};

// Send simple notification (for quick alerts)
export const sendSimpleNotification = async (
  title: string,
  message: string,
  priority: '1' | '2' | '3' | '4' | '5' = '3'
) => {
  return await sendPushNotification(title, message, priority);
};

// Test push notifications
export const testPushNotifications = async () => {
  console.log('🧪 Testing push notifications...');
  
  const testOrderData: OrderNotificationData = {
    orderId: `TEST-${Date.now()}`,
    customerInfo: {
      fullName: 'Test Customer',
      phone: '+447123456789',
      email: 'test@example.com',
      address: '123 Test Street',
      city: 'London',
      postcode: 'SW1A 1AA'
    },
    items: [
      {
        name: 'Jollof Rice',
        quantity: 2,
        price: 12.99,
        selectedSize: { size: 'Large', price: 12.99 }
      },
      {
        name: 'Chicken Curry',
        quantity: 1,
        price: 15.99,
        selectedSize: { size: 'Medium', price: 15.99 }
      }
    ],
    totalAmount: 41.97,
    finalTotal: 66.96,
    deliveryFee: 24.99,
    fulfillmentType: 'delivery',
    paymentMethod: 'Card Payment',
    timestamp: new Date().toISOString()
  };

  const testPaymentData: PaymentNotificationData = {
    orderId: `TEST-${Date.now()}`,
    customerInfo: {
      fullName: 'Test Customer',
      phone: '+447123456789',
      email: 'test@example.com'
    },
    amount: 63.96,
    paymentMethod: 'Card Payment',
    status: 'success',
    timestamp: new Date().toISOString(),
    transactionId: 'txn_test_123456'
  };

  const testCustomerMessageData: CustomerMessageData = {
    customerInfo: {
      fullName: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+447987654321'
    },
    subject: 'Allergy Question',
    message: 'Hi, I have a nut allergy and wanted to check if your Jollof Rice contains any nuts. Also, do you offer any nut-free alternatives? Thanks!',
    timestamp: new Date().toISOString(),
    source: 'contact-form'
  };

  const results = {
    orderNotification: await sendOrderPushNotification(testOrderData),
    paymentNotification: await sendPaymentPushNotification(testPaymentData),
    customerMessageNotification: await sendCustomerMessageNotification(testCustomerMessageData),
    urgentNotification: await sendUrgentPushNotification('Test urgent notification'),
    simpleNotification: await sendSimpleNotification('Test Simple', 'This is a simple test notification')
  };

  return results;
}; 