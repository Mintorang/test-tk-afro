# 🍎💳 Apple Pay & Google Pay Setup Guide

## 📋 **Current Status: 80% Complete**

### ✅ **Already Implemented:**
- ✅ Mobile payment component (`MobilePayment.tsx`)
- ✅ Payment selector integration
- ✅ Stripe integration code
- ✅ Domain verification file structure
- ✅ Environment variables configured
- ✅ Build successful, deployed to live site

### ❌ **Still Required:**
- ❌ Stripe Dashboard configuration
- ❌ Real domain verification file
- ❌ Live testing and validation

---

# 🔧 **STEP-BY-STEP COMPLETION GUIDE**

## **STEP 1: Stripe Dashboard Configuration**

### **1.1 Login to Stripe Dashboard**
1. Go to: https://dashboard.stripe.com
2. Login with your Stripe account credentials
3. Ensure you're in the correct account (test/live mode)

### **1.2 Enable Apple Pay**
1. Navigate to: **Settings** → **Payment methods**
2. Find the **Apple Pay** section
3. Click **"Enable Apple Pay"**
4. Add your domain: `tkafrokitchen.com`
5. Click **"Save"**

### **1.3 Enable Google Pay**
1. In the same **Payment methods** section
2. Find the **Google Pay** section
3. Click **"Enable Google Pay"**
4. Add your domain: `tkafrokitchen.com`
5. Click **"Save"**

### **1.4 Get Domain Verification File**
1. In the **Apple Pay** settings section
2. Look for **"Domain verification"** or **"Domain association file"**
3. **Download the verification file** (it will be a .txt or .json file)
4. **Note the file name** (usually `apple-developer-merchantid-domain-association`)

---

## **STEP 2: Update Domain Verification File**

### **2.1 Replace the Placeholder File**
1. Open the downloaded file from Stripe
2. Copy **ALL** the content from the Stripe file
3. Open: `public/.well-known/apple-developer-merchantid-domain-association`
4. **Delete everything** in the file
5. **Paste the real content** from Stripe
6. Save the file

### **2.2 Verify File is Accessible**
1. Deploy the changes to your live site
2. Test the URL: `https://tkafrokitchen.com/.well-known/apple-developer-merchantid-domain-association`
3. You should see the real verification content (not the placeholder)

---

## **STEP 3: Test the Integration**

### **3.1 Test on iPhone/iPad (Apple Pay)**
1. **Open Safari** on iPhone/iPad
2. **Go to**: https://tkafrokitchen.com
3. **Add items to cart** and proceed to checkout
4. **Select "Mobile Wallet"** payment method
5. **Tap "Pay with Apple Pay / Google Pay"**
6. **Apple Pay sheet should appear**
7. **Test with a test card** (see test cards below)

### **3.2 Test on Android (Google Pay)**
1. **Open Chrome** on Android device
2. **Ensure Google Pay app is installed**
3. **Go to**: https://tkafrokitchen.com
4. **Add items to cart** and proceed to checkout
5. **Select "Mobile Wallet"** payment method
6. **Tap "Pay with Apple Pay / Google Pay"**
7. **Google Pay sheet should appear**

### **3.3 Test on Desktop**
1. **Open Chrome** on desktop
2. **Add payment methods to Chrome** (Settings → Payment methods)
3. **Go to**: https://tkafrokitchen.com
4. **Test the mobile payment flow**

---

## **STEP 4: Test Cards**

### **Apple Pay Test Cards:**
```
Visa: 4000 0000 0000 0002
Mastercard: 5200 8282 8282 8210
American Express: 3782 822463 10005
```

### **Google Pay Test Cards:**
```
Visa: 4000 0000 0000 0002
Mastercard: 5200 8282 8282 8210
```

### **How to Add Test Cards:**
1. **iPhone**: Settings → Wallet & Apple Pay → Add Card
2. **Android**: Google Pay app → Payment methods → Add card
3. **Desktop Chrome**: Settings → Payment methods → Add

---

## **STEP 5: Troubleshooting**

### **Common Issues & Solutions:**

#### **Issue: "Mobile Payment Not Available"**
**Cause**: Device/browser doesn't support Apple Pay/Google Pay
**Solution**: 
- Use supported device/browser
- Ensure payment methods are set up
- Check if HTTPS is enabled

#### **Issue: Apple Pay button doesn't appear**
**Cause**: Domain verification failed
**Solution**:
- Check domain verification file content
- Ensure file is accessible at correct URL
- Verify Stripe Apple Pay is enabled

#### **Issue: Google Pay button doesn't appear**
**Cause**: Browser/device not supported
**Solution**:
- Use Chrome browser
- Ensure Google Pay app is installed (mobile)
- Check if HTTPS is enabled

#### **Issue: Payment fails**
**Cause**: Test card issues or configuration problems
**Solution**:
- Use correct test card numbers
- Check Stripe dashboard for errors
- Verify environment variables

---

## **STEP 6: Go Live Checklist**

### **Before Going Live:**
- [ ] Stripe Apple Pay enabled
- [ ] Stripe Google Pay enabled
- [ ] Domain verification file updated with real content
- [ ] Tested on iPhone Safari (Apple Pay)
- [ ] Tested on Android Chrome (Google Pay)
- [ ] Tested on desktop Chrome (Google Pay)
- [ ] All test payments successful
- [ ] Error handling working properly

### **Post-Launch Monitoring:**
- [ ] Monitor first real transactions
- [ ] Check Stripe dashboard for any errors
- [ ] Monitor user adoption of mobile payments
- [ ] Gather user feedback
- [ ] Track conversion rates by payment method

---

## **STEP 7: Verification Commands**

### **Check Domain Verification File:**
```bash
curl -I https://tkafrokitchen.com/.well-known/apple-developer-merchantid-domain-association
```

### **Check if Mobile Payment Component Loads:**
1. Open browser developer tools
2. Go to checkout page
3. Select "Mobile Wallet" payment method
4. Check console for any errors

### **Test Payment Request API:**
```javascript
// In browser console on checkout page
stripe.paymentRequest({
  country: 'GB',
  currency: 'gbp',
  total: { label: 'Test', amount: 1000 }
}).canMakePayment().then(console.log);
```

---

## **📞 Support Resources**

### **Stripe Support:**
- **Documentation**: https://stripe.com/docs/apple-pay
- **Support**: https://support.stripe.com
- **Dashboard**: https://dashboard.stripe.com

### **Apple Developer:**
- **Apple Pay**: https://developer.apple.com/apple-pay/
- **Domain Verification**: https://developer.apple.com/documentation/apple_pay_on_the_web

### **Google Pay:**
- **Documentation**: https://developers.google.com/pay
- **Support**: https://developers.google.com/pay/api/web/support

---

## **🎯 Expected Results**

### **After Complete Setup:**
- ✅ Apple Pay button appears on iPhone/iPad Safari
- ✅ Google Pay button appears on Android Chrome
- ✅ Google Pay button appears on desktop Chrome
- ✅ Native payment sheets open when tapped
- ✅ Biometric authentication works (Face ID, Touch ID, PIN)
- ✅ Payments process successfully
- ✅ Success/error handling works properly

### **User Experience:**
- **One-tap payment** instead of manual card entry
- **Biometric security** for authentication
- **Native device integration** feels seamless
- **Faster checkout** process
- **Higher conversion rates** due to reduced friction

---

**Last Updated**: December 2024
**Status**: Ready for completion
**Estimated Time**: 30-60 minutes for full setup 