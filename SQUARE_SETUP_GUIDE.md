# Square Payment Integration Setup Guide

## 🚀 **Square Integration for TK Afro Kitchen**

This guide will help you set up Square payments alongside your existing Stripe integration to provide faster payment processing and lower fees.

## 📋 **Prerequisites**

1. **Square Developer Account**: Sign up at [developer.squareup.com](https://developer.squareup.com)
2. **Square Business Account**: Create a business account at [squareup.com](https://squareup.com)
3. **UK Bank Account**: For receiving payments
4. **Business Verification**: Complete Square's business verification process

## 🔧 **Step 1: Square Developer Setup**

### **1.1 Create Square Application**
1. Go to [developer.squareup.com](https://developer.squareup.com)
2. Sign in with your Square account
3. Click "New Application"
4. Name: `TK Afro Kitchen Web Payments`
5. Description: `Online payment processing for TK Afro Kitchen food delivery`

### **1.2 Get Application Credentials**
1. In your Square application dashboard, go to "Credentials"
2. Copy the following values:
   - **Application ID** (starts with `sq0idp-`)
   - **Access Token** (starts with `EAAA`)
   - **Location ID** (starts with `L`)

### **1.3 Configure Webhook**
1. Go to "Webhooks" in your Square application
2. Add webhook endpoint: `https://tkafrokitchen.com/api/square/webhooks`
3. Select events:
   - `payment.created`
   - `payment.updated`
   - `payment.completed`
   - `payment.failed`
4. Copy the **Webhook Signature Key**

## 🔧 **Step 2: Environment Variables**

Add the following environment variables to your `.env.local` file:

```bash
# Square Configuration
SQUARE_APP_ID=sq0idp-xxxxxxxxxxxxxxxxxxxxx
SQUARE_ACCESS_TOKEN=EAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SQUARE_LOCATION_ID=Lxxxxxxxxxxxxxxxxxxxxx
SQUARE_WEBHOOK_SIGNATURE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Public Square App ID (for frontend)
NEXT_PUBLIC_SQUARE_APP_ID=sq0idp-xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SQUARE_LOCATION_ID=Lxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 **Step 3: Square Business Account Setup**

### **3.1 Complete Business Verification**
1. Log in to your Square business account
2. Go to "Settings" > "Business Information"
3. Complete business verification:
   - Business name: `TK Afro Kitchen`
   - Business type: `Food & Beverage`
   - Address: Your Milton Keynes address
   - Phone: Your business phone
   - Website: `https://tkafrokitchen.com`

### **3.2 Connect Bank Account**
1. Go to "Settings" > "Banking"
2. Add your UK bank account details
3. Verify the account with test deposits

### **3.3 Set Up Settlement Schedule**
1. Go to "Settings" > "Settlement"
2. Choose "Same Day Settlement" for faster cash flow
3. Set settlement currency to GBP

## 🔧 **Step 4: Testing Setup**

### **4.1 Sandbox Testing**
1. Use Square's sandbox environment for testing
2. Test payment flow with test card numbers:
   - **Visa**: `4111111111111111`
   - **Mastercard**: `5555555555554444`
   - **Expiry**: Any future date
   - **CVV**: Any 3 digits

### **4.2 Test Webhooks**
1. Use Square's webhook testing tool
2. Send test events to your webhook endpoint
3. Verify payment notifications are received

## 🔧 **Step 5: Production Setup**

### **5.1 Switch to Production**
1. In Square Developer Dashboard, switch to "Production"
2. Update environment variables with production credentials
3. Update webhook URL to production domain

### **5.2 Verify Production Setup**
1. Test with real payment methods
2. Verify webhook notifications
3. Check settlement to bank account

## 📊 **Fee Structure**

### **Square Fees (UK)**
- **Online Transactions**: 1.9% + 20p per transaction
- **Card Reader Transactions**: 1.75% per transaction
- **No Monthly Fees**: Pay only for what you use
- **Same Day Settlement**: Faster than Stripe's 3-5 days

### **Cost Comparison**
| Order Value | Stripe (2.5%) | Square (1.9% + 20p) | Savings |
|-------------|---------------|---------------------|---------|
| £20.00 | £0.50 | £0.58 | -£0.08 |
| £30.00 | £0.75 | £0.77 | -£0.02 |
| £40.00 | £1.00 | £0.96 | £0.04 |
| £50.00 | £1.25 | £1.15 | £0.10 |

**Square becomes cheaper on orders over £33!**

## 🚀 **Integration Benefits**

### **Immediate Benefits**
- ✅ **Faster Settlement**: Same day vs 3-5 days
- ✅ **Lower Fees**: On orders over £33
- ✅ **Real-Time Processing**: Instant payment confirmation
- ✅ **Better Cash Flow**: No payment delays

### **Business Growth Features**
- ✅ **Inventory Management**: Track frozen food stock
- ✅ **Customer Database**: Build customer profiles
- ✅ **Analytics Dashboard**: Detailed sales insights
- ✅ **Loyalty Programs**: Encourage repeat orders

### **Future Expansion**
- ✅ **Mobile POS**: Accept in-person payments
- ✅ **Hardware Integration**: Card readers for events
- ✅ **Multi-Location**: Scale as you grow
- ✅ **Advanced Reporting**: Business intelligence

## 🔍 **Monitoring & Analytics**

### **Square Dashboard Features**
1. **Real-Time Sales**: See transactions as they happen
2. **Customer Insights**: Track customer behavior
3. **Inventory Reports**: Monitor stock levels
4. **Settlement Tracking**: Monitor bank deposits

### **Integration Analytics**
1. **Payment Method Preferences**: Which methods customers choose
2. **Conversion Rates**: Payment success rates
3. **Average Order Value**: Track order trends
4. **Customer Lifetime Value**: Long-term customer value

## 🛠 **Troubleshooting**

### **Common Issues**

**1. Payment Declined**
- Check card details are correct
- Verify card has sufficient funds
- Check for fraud protection blocks

**2. Webhook Notifications**
- Verify webhook URL is accessible
- Check webhook signature verification
- Monitor webhook delivery logs

**3. Settlement Delays**
- Verify bank account details
- Check business verification status
- Contact Square support if needed

### **Support Resources**
- **Square Developer Docs**: [developer.squareup.com/docs](https://developer.squareup.com/docs)
- **Square Business Support**: [squareup.com/help](https://squareup.com/help)
- **UK Business Support**: +44 20 3327 1000

## 📞 **Next Steps**

1. **Complete Square Account Setup**
2. **Add Environment Variables**
3. **Test Sandbox Integration**
4. **Deploy to Production**
5. **Monitor Performance**

## 🎯 **Success Metrics**

Track these metrics to measure Square integration success:
- **Payment Success Rate**: Target >98%
- **Settlement Speed**: Same day vs previous 3-5 days
- **Fee Savings**: Calculate monthly savings vs Stripe
- **Customer Satisfaction**: Payment experience feedback

---

**Need Help?** Contact Square UK support or refer to the integration code in your project. 