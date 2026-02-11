# 📱 Mobile Notifications Setup Guide

## 🎯 **Overview**

This guide will help you set up mobile notifications (SMS and WhatsApp) for TK Afro Kitchen. When customers complete orders, kitchen staff will receive instant notifications on their phones.

## 🔧 **Required Services**

### **1. Twilio Account**
- **Purpose**: Send SMS and WhatsApp messages
- **Cost**: Pay-per-use (very affordable)
- **Setup**: [Sign up at Twilio.com](https://www.twilio.com/)

### **2. WhatsApp Business API**
- **Purpose**: Send WhatsApp messages
- **Setup**: Configure through Twilio
- **Note**: Requires approval from WhatsApp

## 📋 **Setup Steps**

### **Step 1: Create Twilio Account**

1. **Sign up at [Twilio.com](https://www.twilio.com/)**
2. **Verify your phone number**
3. **Get your Account SID and Auth Token**
4. **Purchase a phone number** (for SMS)

### **Step 2: Configure WhatsApp Business API**

1. **In Twilio Console, go to Messaging → Try it out → Send a WhatsApp message**
2. **Follow the setup instructions**
3. **Get your WhatsApp number** (format: `whatsapp:+14155238886`)

### **Step 3: Add Environment Variables**

Add these variables to your `.env.local` file:

```bash
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+447123456789
TWILIO_WHATSAPP_FROM=whatsapp:+14155238886

# Kitchen Staff Contact Information
KITCHEN_PHONE_PRIMARY=+447123456789
KITCHEN_WHATSAPP_PRIMARY=whatsapp:+447123456789
KITCHEN_PHONE_SECONDARY=+447987654321
KITCHEN_WHATSAPP_SECONDARY=whatsapp:+447987654321
KITCHEN_PHONE_MANAGER=+447111111111
KITCHEN_WHATSAPP_MANAGER=whatsapp:+447111111111
```

### **Step 4: Install Twilio Package**

```bash
npm install twilio
```

## 📱 **Notification Types**

### **1. Order Notifications**
- **Recipients**: All kitchen staff
- **Content**: Order details, customer info, items, total
- **Channels**: SMS (urgent) + WhatsApp (detailed)

### **2. Payment Notifications**
- **Recipients**: Kitchen manager only
- **Content**: Payment status, amount, customer info
- **Channels**: SMS + WhatsApp

### **3. Urgent Notifications**
- **Recipients**: Primary kitchen staff
- **Content**: Critical system alerts
- **Channels**: SMS + WhatsApp

## 🧪 **Testing**

### **Test the System**

```bash
# Test mobile notifications
node scripts/test-mobile-notifications.js

# Test via API
curl -X POST http://localhost:3001/api/mobile-notifications \
  -H "Content-Type: application/json" \
  -d '{"testMode": true}'
```

### **Test Order Notifications**

```bash
curl -X POST http://localhost:3001/api/mobile-notifications \
  -H "Content-Type: application/json" \
  -d '{
    "type": "order",
    "data": {
      "orderId": "TEST-123",
      "customerInfo": {
        "fullName": "John Smith",
        "phone": "+447123456789",
        "email": "john@example.com"
      },
      "items": [
        {
          "name": "Jollof Rice",
          "quantity": 2,
          "price": 12.99,
          "selectedSize": {"size": "Large", "price": 12.99}
        }
      ],
      "totalAmount": 25.98,
      "finalTotal": 47.97,
      "deliveryFee": 21.99,
      "fulfillmentType": "delivery",
      "paymentMethod": "Card",
      "timestamp": "2025-07-20T08:00:00Z"
    }
  }'
```

## 📊 **Notification Flow**

### **When Order is Completed:**

1. **Customer completes checkout**
2. **System sends customer confirmation email**
3. **System sends kitchen notifications:**
   - **SMS**: Urgent alert to all staff
   - **WhatsApp**: Detailed order info to all staff
   - **Email**: Full order details to kitchen emails
4. **System sends payment notification to manager**

### **Message Examples:**

#### **SMS (Urgent)**
```
🚨 URGENT: NEW ORDER #12345
💰 £47.97 - John Smith
📞 +447123456789
🚚 DELIVERY
⏰ 14:30
```

#### **WhatsApp (Detailed)**
```
🍽️ NEW ORDER ALERT! 🍽️

Order ID: 12345
Total: £47.97
Payment: Card Payment
Fulfillment: 🚚 DELIVERY (£21.99 fee)

Customer: John Smith
Phone: +447123456789
Email: john@example.com

Delivery Address: 123 Test Street, London, SW1A 1AA

ITEMS:
• 2x Jollof Rice (Large) - £25.98

Subtotal: £25.98
Delivery: £21.99
TOTAL: £47.97

Time: 20/07/2025, 14:30:00
Expected: Next working day

⏰ Please confirm receipt and estimated preparation time.
```

## 🔒 **Security & Privacy**

### **Phone Number Protection**
- **Validation**: All phone numbers are validated
- **Format**: International format required (+44...)
- **Storage**: Securely stored in environment variables

### **Message Content**
- **No sensitive data**: Payment details are masked
- **Customer privacy**: Only necessary info shared
- **Professional tone**: All messages are business-appropriate

## 💰 **Costs**

### **Twilio Pricing (UK)**
- **SMS**: ~£0.04 per message
- **WhatsApp**: ~£0.02 per message
- **Phone number**: ~£1/month

### **Estimated Monthly Costs**
- **50 orders/day**: ~£90/month
- **100 orders/day**: ~£180/month
- **200 orders/day**: ~£360/month

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. "Twilio not configured"**
- **Solution**: Check environment variables
- **Verify**: TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN

#### **2. "Invalid phone number"**
- **Solution**: Use international format
- **Example**: +447123456789 (not 07123456789)

#### **3. "WhatsApp not working"**
- **Solution**: Complete WhatsApp Business API setup
- **Verify**: TWILIO_WHATSAPP_FROM is correct

#### **4. "Messages not delivered"**
- **Check**: Twilio console for delivery status
- **Verify**: Phone numbers are correct
- **Test**: Use Twilio's test numbers first

### **Testing Numbers**

#### **Twilio Test Numbers**
- **SMS**: +15005550006
- **WhatsApp**: whatsapp:+15005550006

#### **Real Testing**
- **Use real phone numbers** for final testing
- **Check both SMS and WhatsApp**
- **Verify message content and formatting**

## 📞 **Support**

### **Twilio Support**
- **Documentation**: [Twilio Docs](https://www.twilio.com/docs)
- **Support**: Available in Twilio Console
- **Community**: [Twilio Community](https://community.twilio.com/)

### **TK Afro Kitchen Support**
- **Email**: chef@tkafrokitchen.com
- **Technical Issues**: Check application logs

## ✅ **Checklist**

### **Setup Complete When:**
- [ ] Twilio account created
- [ ] Environment variables configured
- [ ] Phone numbers purchased
- [ ] WhatsApp Business API approved
- [ ] Test notifications working
- [ ] Real notifications tested
- [ ] Staff trained on notification system

### **Go Live Checklist:**
- [ ] All phone numbers verified
- [ ] Notification content approved
- [ ] Staff availability confirmed
- [ ] Backup notification system ready
- [ ] Monitoring system in place

---

**Status**: 🔄 Setup in Progress
**Last Updated**: July 20, 2025
**Next Review**: After initial testing 