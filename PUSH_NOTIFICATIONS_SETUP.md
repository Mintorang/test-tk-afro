# 🔔 Push Notifications Setup Guide (ntfy.sh)

## 🎯 **Overview**

This guide will help you set up **FREE** push notifications for TK Afro Kitchen using ntfy.sh. When customers complete orders, you'll receive instant push notifications on your phone.

## 🆓 **Why ntfy.sh?**

- **✅ Completely FREE** - No monthly costs
- **✅ Simple setup** - Just one line of code
- **✅ Instant delivery** - Push notifications to your phone
- **✅ No account required** - Just choose a topic name
- **✅ Works everywhere** - iOS, Android, Desktop

## 📱 **Setup Steps**

### **Step 1: Choose Your Topic**

1. **Pick a unique topic name** (e.g., `tk-afro-kitchen-orders`)
2. **Make it private** - use a random string like `tk-afro-kitchen-abc123xyz`

### **Step 2: Install ntfy App**

#### **iPhone (iOS)**
1. **Download ntfy** from the App Store
2. **Open the app**
3. **Tap "Add subscription"**
4. **Enter your topic**: `tk-afro-kitchen-orders`
5. **Enable notifications** in iOS Settings

#### **Android**
1. **Download ntfy** from Google Play Store
2. **Open the app**
3. **Tap "Add subscription"**
4. **Enter your topic**: `tk-afro-kitchen-orders`
5. **Enable notifications** in Android Settings

#### **Desktop (Optional)**
1. **Visit [ntfy.sh](https://ntfy.sh)**
2. **Enter your topic** in the web interface
3. **Keep the tab open** for desktop notifications

### **Step 3: Add Environment Variable**

Add this to your `.env.local` file:

```bash
# Push Notifications (ntfy.sh)
NTFY_TOPIC=tk-afro-kitchen-orders
```

**Replace `tk-afro-kitchen-orders` with your chosen topic name.**

### **Step 4: Test the System**

```bash
# Test push notifications
node scripts/test-push-notifications.js

# Test via API
curl -X POST http://localhost:3001/api/push-notifications \
  -H "Content-Type: application/json" \
  -d '{"testMode": true}'
```

## 📱 **Notification Examples**

### **Order Notification**
```
🍽️ NEW ORDER #12345

💰 £47.97 - John Smith
📞 +447123456789
🚚 DELIVERY (£21.99 fee)
⏰ 14:30

ITEMS:
• 2x Jollof Rice (Large) - £25.98

Subtotal: £25.98
Delivery: £21.99
TOTAL: £47.97
Payment: Card Payment

📍 123 Test Street, London, SW1A 1AA
```

### **Payment Notification**
```
✅ PAYMENT SUCCESSFUL

Order #12345
💰 £47.97
👤 John Smith
📞 +447123456789
💳 Card Payment
⏰ 14:30
🔗 txn_123456789

✅ Order confirmed and ready for preparation
```

### **Urgent Notification**
```
🚨 URGENT: SYSTEM

Kitchen equipment malfunction - immediate attention required
⏰ 20/07/2025, 14:30:00
🔔 Immediate action required
```

## 🧪 **Testing**

### **Quick Test**
```bash
curl -X POST http://localhost:3001/api/push-notifications \
  -H "Content-Type: application/json" \
  -d '{
    "title": "🍽️ Test Notification",
    "message": "This is a test from TK Afro Kitchen!",
    "priority": "3"
  }'
```

### **Test Order Notification**
```bash
curl -X POST http://localhost:3001/api/push-notifications \
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

## 🔄 **How It Works**

### **When Order is Completed:**

1. **✅ Customer completes checkout**
2. **📧 Customer receives confirmation email**
3. **🔔 You receive push notification** with order details
4. **💰 Payment notification** sent separately
5. **📧 Kitchen staff receive email** (if configured)

### **Notification Flow:**
```
Order Completed → 
├── Customer Email (confirmation)
├── Push Notification (your phone) ← NEW!
├── Kitchen Email (if configured)
└── Payment Notification (your phone)
```

## ⚙️ **Configuration Options**

### **Priority Levels**
- **1**: Min priority (quiet)
- **2**: Low priority
- **3**: Default priority
- **4**: High priority (orders)
- **5**: Urgent priority (failed payments, urgent alerts)

### **Message Formatting**
- **Title**: Short, descriptive
- **Message**: Detailed information
- **Tags**: Visual indicators (emojis, icons)
- **Priority**: Urgency level

## 🔒 **Security & Privacy**

### **Topic Privacy**
- **Choose a unique topic** - don't use common names
- **Make it random** - e.g., `tk-afro-kitchen-abc123xyz`
- **Keep it private** - don't share your topic publicly

### **Message Content**
- **No sensitive data** - payment details are masked
- **Customer privacy** - only necessary info shared
- **Professional tone** - all messages are business-appropriate

## 💰 **Costs**

### **ntfy.sh Pricing**
- **✅ Completely FREE** - No monthly costs
- **✅ No usage limits** - Send unlimited notifications
- **✅ No registration** - Just choose a topic
- **✅ No credit card** - No payment required

### **Comparison with Other Services**
| Service | Cost | Setup | Features |
|---------|------|-------|----------|
| **ntfy.sh** | **FREE** | **Simple** | **Push notifications** |
| Twilio SMS | ~£0.04/message | Complex | SMS + WhatsApp |
| Email only | Free | Medium | Email notifications |

## 🚨 **Troubleshooting**

### **Common Issues**

#### **1. "No notifications received"**
- **Check**: ntfy app is installed and configured
- **Verify**: Topic name matches exactly
- **Test**: Use the web interface at ntfy.sh

#### **2. "Topic not found"**
- **Solution**: Create the topic by sending a test message
- **Verify**: Topic name is correct in .env.local

#### **3. "Notifications delayed"**
- **Check**: Internet connection
- **Verify**: ntfy.sh service status
- **Test**: Send a test message

#### **4. "App not working"**
- **Reinstall**: Delete and reinstall ntfy app
- **Check permissions**: Enable notifications in phone settings
- **Restart**: Restart your phone

### **Testing Checklist**
- [ ] **ntfy app installed** and configured
- [ ] **Topic subscription** added
- [ ] **Notifications enabled** in phone settings
- [ ] **Test message** received
- [ ] **Order notification** received
- [ ] **Payment notification** received

## 📞 **Support**

### **ntfy.sh Support**
- **Documentation**: [ntfy.sh/docs](https://docs.ntfy.sh/)
- **GitHub**: [github.com/binwiederhier/ntfy](https://github.com/binwiederhier/ntfy)
- **Community**: [ntfy.sh/discussions](https://github.com/binwiederhier/ntfy/discussions)

### **TK Afro Kitchen Support**
- **Email**: chef@tkafrokitchen.com
- **Technical Issues**: Check application logs

## ✅ **Checklist**

### **Setup Complete When:**
- [ ] ntfy app installed on your phone
- [ ] Topic subscription added
- [ ] Environment variable configured
- [ ] Test notifications working
- [ ] Order notifications received
- [ ] Payment notifications received

### **Go Live Checklist:**
- [ ] All notification types tested
- [ ] Notification content approved
- [ ] Phone notifications enabled
- [ ] Backup notification system ready
- [ ] Staff trained on notification system

## 🎉 **Benefits**

### **For Your Business:**
- **⚡ Instant notifications** - never miss an order
- **📱 Mobile-first** - notifications on your phone
- **🆓 Completely free** - no monthly costs
- **📊 Professional** - enhances customer service

### **For You:**
- **🔔 Immediate alerts** - know about orders instantly
- **📋 Complete information** - all order details included
- **💰 Payment confirmations** - know when money is received
- **⏰ Time management** - respond quickly to orders

---

**Status**: 🔄 Setup in Progress
**Last Updated**: July 20, 2025
**Next Review**: After initial testing

## 🚀 **Quick Start**

1. **Install ntfy app** on your phone
2. **Add topic**: `tk-afro-kitchen-orders`
3. **Add to .env.local**: `NTFY_TOPIC=tk-afro-kitchen-orders`
4. **Test**: Run the test script
5. **Done!** You'll receive notifications for all orders

**That's it! Your push notification system is ready to go.** 🎉 