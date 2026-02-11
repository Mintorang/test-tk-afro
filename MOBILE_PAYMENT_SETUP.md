# 🍎💳 Apple Pay & Google Pay Integration Guide

## 📋 **Overview**

This guide covers the complete setup for Apple Pay and Google Pay integration on TK Afro Kitchen website using Stripe's Payment Request API.

## ✅ **What's Already Implemented**

- ✅ Mobile payment component (`MobilePayment.tsx`)
- ✅ Payment selector integration
- ✅ Stripe Payment Request API integration
- ✅ Automatic wallet detection
- ✅ Fallback handling for unsupported devices

## 🚀 **Setup Steps**

### **1. Stripe Configuration**

#### **Enable Payment Request API in Stripe Dashboard:**
1. Log into your [Stripe Dashboard](https://dashboard.stripe.com)
2. Go to **Settings** → **Payment methods**
3. Enable **Apple Pay** and **Google Pay**
4. Add your domain: `tkafrokitchen.com`

#### **Required Environment Variables:**
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
```

### **2. Apple Pay Setup**

#### **Domain Verification:**
1. Create file: `public/.well-known/apple-developer-merchantid-domain-association`
2. Content should be provided by Stripe in your dashboard
3. Ensure file is accessible at: `https://tkafrokitchen.com/.well-known/apple-developer-merchantid-domain-association`

#### **Apple Pay Requirements:**
- ✅ HTTPS enabled (required)
- ✅ Domain verification file in place
- ✅ Stripe account configured for Apple Pay
- ✅ iOS Safari or macOS Safari browser

### **3. Google Pay Setup**

#### **Google Pay Requirements:**
- ✅ HTTPS enabled (required)
- ✅ Stripe account configured for Google Pay
- ✅ Chrome browser (desktop/mobile)
- ✅ Android device with Google Pay app (mobile)

### **4. Testing**

#### **Test Cards for Apple Pay:**
```
Visa: 4000 0000 0000 0002
Mastercard: 5200 8282 8282 8210
Amex: 3782 822463 10005
```

#### **Test Cards for Google Pay:**
```
Visa: 4000 0000 0000 0002
Mastercard: 5200 8282 8282 8210
```

## 🔧 **Technical Implementation**

### **Component Structure:**
```
src/components/payment/
├── MobilePayment.tsx          # Main mobile payment component
├── PaymentSelector.tsx        # Updated to include mobile option
└── StripeCheckout.tsx         # Existing card payment component
```

### **Key Features:**
- **Automatic Detection**: Detects Apple Pay/Google Pay availability
- **Fallback Handling**: Shows alternative payment methods if not supported
- **Error Handling**: Comprehensive error handling and user feedback
- **Safari Optimization**: Special handling for iOS Safari
- **Biometric Security**: Leverages device security features

### **Payment Flow:**
1. User selects "Mobile Payment" option
2. Component checks for Apple Pay/Google Pay support
3. If supported, shows payment button
4. User taps button → native payment sheet opens
5. User authenticates (Face ID, Touch ID, PIN)
6. Payment processed through Stripe
7. Success/error callback handled

## 📱 **Browser & Device Support**

### **Apple Pay:**
- ✅ iOS Safari (iPhone/iPad)
- ✅ macOS Safari
- ❌ Chrome on iOS (not supported by Apple)
- ❌ Firefox on iOS (not supported by Apple)

### **Google Pay:**
- ✅ Chrome (desktop/mobile)
- ✅ Android Chrome with Google Pay app
- ✅ Samsung Internet (Android)
- ❌ Safari (not supported by Google)

## 🎯 **User Experience**

### **Supported Devices:**
- **iPhone/iPad**: Apple Pay button appears
- **Android**: Google Pay button appears
- **Desktop Chrome**: Google Pay button appears
- **Desktop Safari**: Apple Pay button appears

### **Unsupported Devices:**
- Shows "Mobile Payment Not Available" message
- Suggests alternative payment methods
- Maintains professional appearance

## 🔒 **Security Features**

- **Tokenization**: Card details never touch your server
- **Biometric Authentication**: Face ID, Touch ID, or device PIN
- **Device Verification**: Apple/Google verify device authenticity
- **Fraud Protection**: Stripe's built-in fraud detection

## 📊 **Analytics & Monitoring**

### **Track Payment Methods:**
```javascript
// Payment success callback includes wallet type
const paymentDetails = {
  paymentIntentId: paymentIntent.id,
  wallet: event.paymentMethod.card?.wallet || 'unknown',
  device: navigator.userAgent,
  timestamp: new Date().toISOString()
};
```

### **Monitor Usage:**
- Track which wallets are most popular
- Monitor conversion rates by payment method
- Identify devices/browsers with issues

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Apple Pay Not Showing:**
- Check domain verification file
- Ensure HTTPS is enabled
- Verify Stripe Apple Pay is enabled
- Test on iOS Safari only

#### **Google Pay Not Showing:**
- Check Stripe Google Pay is enabled
- Test on Chrome browser
- Ensure Google Pay app is installed (mobile)

#### **Payment Fails:**
- Check Stripe logs for errors
- Verify test card numbers
- Check network connectivity
- Review browser console for errors

### **Debug Commands:**
```javascript
// Check payment request support
stripe.paymentRequest({
  country: 'GB',
  currency: 'gbp',
  total: { label: 'Test', amount: 1000 }
}).canMakePayment().then(console.log);

// Check specific wallet support
pr.canMakePayment().then(result => {
  console.log('Apple Pay:', result.applePay);
  console.log('Google Pay:', result.googlePay);
});
```

## 📈 **Performance Optimization**

### **Best Practices:**
- Load Stripe.js early in page lifecycle
- Cache payment request object
- Handle errors gracefully
- Provide clear user feedback
- Optimize for mobile performance

### **Loading Strategy:**
```javascript
// Preload Stripe for faster payment
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// Use in component
const stripe = useStripe();
```

## 🎉 **Go Live Checklist**

### **Before Going Live:**
- [ ] Test with real cards (not test cards)
- [ ] Verify domain verification files
- [ ] Test on multiple devices/browsers
- [ ] Check error handling
- [ ] Monitor first few transactions
- [ ] Update customer support documentation

### **Post-Launch Monitoring:**
- [ ] Monitor payment success rates
- [ ] Track user adoption of mobile payments
- [ ] Monitor for any errors or issues
- [ ] Gather user feedback
- [ ] Optimize based on usage patterns

## 📞 **Support**

For technical support:
- **Stripe Support**: [support.stripe.com](https://support.stripe.com)
- **Apple Developer**: [developer.apple.com](https://developer.apple.com)
- **Google Pay**: [developers.google.com/pay](https://developers.google.com/pay)

## 🔄 **Updates & Maintenance**

### **Regular Tasks:**
- Monitor Stripe API updates
- Test on new iOS/Android versions
- Update test cards as needed
- Review security best practices
- Monitor payment success rates

### **Version Compatibility:**
- Stripe.js: Latest version
- React: 18.2.0+
- Next.js: 14.1.0+
- iOS: 12.0+
- Android: 6.0+

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Status**: Ready for Production 