import twilio from 'twilio';

// Twilio Configuration
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER; // For SMS
const TWILIO_WHATSAPP_FROM = process.env.TWILIO_WHATSAPP_FROM; // For WhatsApp

// Kitchen staff contact information
const KITCHEN_CONTACTS = {
  primary: {
    phone: process.env.KITCHEN_PHONE_PRIMARY,
    whatsapp: process.env.KITCHEN_WHATSAPP_PRIMARY,
    name: 'Primary Kitchen Staff'
  },
  secondary: {
    phone: process.env.KITCHEN_PHONE_SECONDARY,
    whatsapp: process.env.KITCHEN_WHATSAPP_SECONDARY,
    name: 'Secondary Kitchen Staff'
  },
  manager: {
    phone: process.env.KITCHEN_PHONE_MANAGER,
    whatsapp: process.env.KITCHEN_WHATSAPP_MANAGER,
    name: 'Kitchen Manager'
  }
};

// Initialize Twilio client
const getTwilioClient = () => {
  if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    console.warn('⚠️ Twilio not configured - mobile notifications disabled');
    return null;
  }
  return twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
};

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
  estimatedDelivery?: string;
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

// Format order details for mobile notifications
const formatOrderForMobile = (orderData: OrderNotificationData) => {
  const fulfillmentText = orderData.fulfillmentType === 'delivery' 
    ? `🚚 DELIVERY (£${orderData.deliveryFee?.toFixed(2) || '24.99'} fee)`
    : `🏪 COLLECTION (FREE)`;

  const addressText = orderData.fulfillmentType === 'delivery' && orderData.customerInfo.address
    ? `${orderData.customerInfo.address}, ${orderData.customerInfo.city}, ${orderData.customerInfo.postcode}`
    : orderData.fulfillmentType === 'collection' 
      ? 'COLLECTION from Milton Keynes kitchen'
      : 'COLLECTION/PICKUP';

  const itemsText = orderData.items.map(item => 
    `• ${item.quantity}x ${item.name} (${item.selectedSize.size}) - £${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');

  return {
    short: `🍽️ NEW ORDER #${orderData.orderId}\n£${orderData.finalTotal} - ${orderData.customerInfo.fullName}\n${fulfillmentText}`,
    
    full: `🍽️ NEW ORDER ALERT! 🍽️

Order ID: ${orderData.orderId}
Total: £${orderData.finalTotal}
Payment: ${orderData.paymentMethod}
Fulfillment: ${fulfillmentText}

Customer: ${orderData.customerInfo.fullName}
Phone: ${orderData.customerInfo.phone}
Email: ${orderData.customerInfo.email}

${orderData.fulfillmentType === 'delivery' ? 'Delivery Address:' : 'Collection:'} ${addressText}

ITEMS:
${itemsText}

Subtotal: £${orderData.totalAmount}
${orderData.fulfillmentType === 'delivery' ? `Delivery: £${orderData.deliveryFee?.toFixed(2) || '24.99'}` : 'Collection: FREE'}
TOTAL: £${orderData.finalTotal}

Time: ${new Date(orderData.timestamp).toLocaleString('en-GB')}
${orderData.fulfillmentType === 'delivery' ? 'Expected: Next working day' : 'We will notify customer when ready'}

⏰ Please confirm receipt and estimated preparation time.`,

    urgent: `🚨 URGENT: NEW ORDER #${orderData.orderId}
💰 £${orderData.finalTotal} - ${orderData.customerInfo.fullName}
📞 ${orderData.customerInfo.phone}
${orderData.fulfillmentType === 'delivery' ? '🚚 DELIVERY' : '🏪 COLLECTION'}
⏰ ${new Date(orderData.timestamp).toLocaleTimeString('en-GB')}`
  };
};

// Format payment details for mobile notifications
const formatPaymentForMobile = (paymentData: PaymentNotificationData) => {
  const statusEmoji = {
    success: '✅',
    failed: '❌',
    pending: '⏳'
  };

  const statusText = {
    success: 'PAYMENT SUCCESSFUL',
    failed: 'PAYMENT FAILED',
    pending: 'PAYMENT PENDING'
  };

  return {
    short: `${statusEmoji[paymentData.status]} ${statusText[paymentData.status]}\nOrder #${paymentData.orderId}\n£${paymentData.amount} - ${paymentData.customerInfo.fullName}`,
    
    full: `${statusEmoji[paymentData.status]} ${statusText[paymentData.status]}

Order ID: ${paymentData.orderId}
Amount: £${paymentData.amount}
Payment Method: ${paymentData.paymentMethod}
Status: ${statusText[paymentData.status]}

Customer: ${paymentData.customerInfo.fullName}
Phone: ${paymentData.customerInfo.phone}
Email: ${paymentData.customerInfo.email}

Time: ${new Date(paymentData.timestamp).toLocaleString('en-GB')}
${paymentData.transactionId ? `Transaction ID: ${paymentData.transactionId}` : ''}

${paymentData.status === 'success' ? '✅ Order confirmed and ready for preparation' : 
  paymentData.status === 'failed' ? '❌ Payment failed - manual intervention required' :
  '⏳ Payment processing - monitor for completion'}`,

    urgent: `🚨 ${statusText[paymentData.status]}
💰 Order #${paymentData.orderId} - £${paymentData.amount}
👤 ${paymentData.customerInfo.fullName}
📞 ${paymentData.customerInfo.phone}
⏰ ${new Date(paymentData.timestamp).toLocaleTimeString('en-GB')}`
  };
};

// Send SMS notification
export const sendSMSNotification = async (
  phoneNumber: string, 
  message: string, 
  contactName: string = 'Kitchen Staff'
) => {
  const client = getTwilioClient();
  if (!client || !TWILIO_PHONE_NUMBER) {
    console.warn('⚠️ SMS not configured - skipping SMS notification');
    return { success: false, error: 'SMS not configured' };
  }

  try {
    const result = await client.messages.create({
      from: TWILIO_PHONE_NUMBER,
      to: phoneNumber,
      body: message,
    });

    console.log(`✅ SMS sent to ${contactName} (${phoneNumber})`);
    return { success: true, messageId: result.sid };
  } catch (error: any) {
    console.error(`❌ SMS failed for ${contactName}:`, error);
    return { success: false, error: error.message };
  }
};

// Send WhatsApp notification
export const sendWhatsAppNotification = async (
  whatsappNumber: string, 
  message: string, 
  contactName: string = 'Kitchen Staff'
) => {
  const client = getTwilioClient();
  if (!client || !TWILIO_WHATSAPP_FROM) {
    console.warn('⚠️ WhatsApp not configured - skipping WhatsApp notification');
    return { success: false, error: 'WhatsApp not configured' };
  }

  try {
    const result = await client.messages.create({
      from: TWILIO_WHATSAPP_FROM,
      to: whatsappNumber,
      body: message,
    });

    console.log(`✅ WhatsApp sent to ${contactName} (${whatsappNumber})`);
    return { success: true, messageId: result.sid };
  } catch (error: any) {
    console.error(`❌ WhatsApp failed for ${contactName}:`, error);
    return { success: false, error: error.message };
  }
};

// Send order notifications to all kitchen staff
export const sendOrderNotifications = async (orderData: OrderNotificationData) => {
  console.log(`📱 Sending mobile order notifications for order ${orderData.orderId}`);
  
  const formattedOrder = formatOrderForMobile(orderData);
  const notifications = [];

  // Send to all kitchen contacts
  for (const [role, contact] of Object.entries(KITCHEN_CONTACTS)) {
    if (contact.phone) {
      const smsResult = await sendSMSNotification(
        contact.phone, 
        formattedOrder.urgent, 
        contact.name
      );
      notifications.push({ type: 'sms', role, contact: contact.name, ...smsResult });
    }

    if (contact.whatsapp) {
      const whatsappResult = await sendWhatsAppNotification(
        contact.whatsapp, 
        formattedOrder.full, 
        contact.name
      );
      notifications.push({ type: 'whatsapp', role, contact: contact.name, ...whatsappResult });
    }
  }

  return {
    success: notifications.some(n => n.success),
    notifications,
    summary: {
      total: notifications.length,
      successful: notifications.filter(n => n.success).length,
      failed: notifications.filter(n => !n.success).length
    }
  };
};

// Send payment notifications to kitchen manager
export const sendPaymentNotifications = async (paymentData: PaymentNotificationData) => {
  console.log(`💰 Sending mobile payment notifications for order ${paymentData.orderId}`);
  
  const formattedPayment = formatPaymentForMobile(paymentData);
  const notifications = [];

  // Send to kitchen manager only for payment notifications
  const manager = KITCHEN_CONTACTS.manager;
  
  if (manager.phone) {
    const smsResult = await sendSMSNotification(
      manager.phone, 
      formattedPayment.urgent, 
      manager.name
    );
    notifications.push({ type: 'sms', role: 'manager', contact: manager.name, ...smsResult });
  }

  if (manager.whatsapp) {
    const whatsappResult = await sendWhatsAppNotification(
      manager.whatsapp, 
      formattedPayment.full, 
      manager.name
    );
    notifications.push({ type: 'whatsapp', role: 'manager', contact: manager.name, ...whatsappResult });
  }

  return {
    success: notifications.some(n => n.success),
    notifications,
    summary: {
      total: notifications.length,
      successful: notifications.filter(n => n.success).length,
      failed: notifications.filter(n => !n.success).length
    }
  };
};

// Send urgent notifications (for critical situations)
export const sendUrgentNotification = async (
  message: string, 
  type: 'order' | 'payment' | 'system' = 'system'
) => {
  console.log(`🚨 Sending urgent notification: ${type}`);
  
  const urgentMessage = `🚨 URGENT: ${message}\n⏰ ${new Date().toLocaleString('en-GB')}`;
  const notifications = [];

  // Send to primary kitchen staff for urgent notifications
  const primary = KITCHEN_CONTACTS.primary;
  
  if (primary.phone) {
    const smsResult = await sendSMSNotification(
      primary.phone, 
      urgentMessage, 
      primary.name
    );
    notifications.push({ type: 'sms', contact: primary.name, ...smsResult });
  }

  if (primary.whatsapp) {
    const whatsappResult = await sendWhatsAppNotification(
      primary.whatsapp, 
      urgentMessage, 
      primary.name
    );
    notifications.push({ type: 'whatsapp', contact: primary.name, ...whatsappResult });
  }

  return {
    success: notifications.some(n => n.success),
    notifications,
    summary: {
      total: notifications.length,
      successful: notifications.filter(n => n.success).length,
      failed: notifications.filter(n => !n.success).length
    }
  };
};

// Test mobile notifications
export const testMobileNotifications = async (testPhone?: string, testWhatsApp?: string) => {
  console.log('🧪 Testing mobile notifications...');
  
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

  const results = {
    orderNotifications: await sendOrderNotifications(testOrderData),
    paymentNotifications: await sendPaymentNotifications(testPaymentData),
    urgentNotification: await sendUrgentNotification('Test urgent notification')
  };

  return results;
}; 