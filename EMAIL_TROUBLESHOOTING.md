# 📧 Email Troubleshooting Guide for TK Afro Kitchen

## 🔍 **Current Email Configuration**

### **SMTP Settings (IONOS)**
```
SMTP_HOST=smtp.ionos.co.uk
SMTP_PORT=465
SMTP_USER=chef@tkafrokitchen.com
SMTP_PASSWORD=tkafrokitchen2025
SMTP_FROM_EMAIL=chef@tkafrokitchen.com
KITCHEN_EMAIL=chef@tkafrokitchen.com
```

### **DNS Configuration Status**
- ✅ **Domain**: tkafrokitchen.com
- ✅ **MX Records**: Configured (mx00.ionos.co.uk, mx01.ionos.co.uk)
- ✅ **SPF Record**: Configured (v=spf1 include:_spf-eu.ionos.com ~all)
- ❓ **DKIM**: Not configured (may cause delivery issues)

## 🚨 **Identified Issues**

### **1. Missing DKIM Configuration**
**Problem**: No DKIM record found for tkafrokitchen.com
**Impact**: Emails may be marked as spam or rejected
**Solution**: Configure DKIM through IONOS control panel

### **2. Email Delivery Test Results**
```
✅ Kitchen Notification Email: SUCCESS
❌ Customer Confirmation Email: FAILED (DNS MX error for test@example.com)
```

## 🔧 **Troubleshooting Steps**

### **Step 1: Verify Email Account Setup**

1. **Check IONOS Email Account**
   - Log into IONOS control panel
   - Verify chef@tkafrokitchen.com account exists
   - Check account status and storage limits
   - Ensure account is not suspended

2. **Test Email Login**
   ```bash
   # Test SMTP connection
   curl -X POST http://localhost:3001/api/test-email \
     -H "Content-Type: application/json" \
     -d '{"email": "chef@tkafrokitchen.com"}'
   ```

### **Step 2: Configure DNS Records**

#### **Required DNS Records:**
```
Type: MX
Name: tkafrokitchen.com
Value: 10 mx00.ionos.co.uk
Value: 10 mx01.ionos.co.uk

Type: TXT
Name: tkafrokitchen.com
Value: v=spf1 include:_spf-eu.ionos.com ~all

Type: TXT
Name: _dmarc.tkafrokitchen.com
Value: v=DMARC1; p=quarantine; rua=mailto:chef@tkafrokitchen.com
```

#### **Missing DKIM Configuration:**
1. Log into IONOS control panel
2. Go to Email & Office → Email Accounts
3. Select chef@tkafrokitchen.com
4. Enable DKIM signing
5. Add the provided DKIM record to DNS

### **Step 3: Test Email Delivery**

#### **Test Kitchen Notifications:**
```bash
curl -X POST http://localhost:3001/api/test-email-flow \
  -H "Content-Type: application/json" \
  -d '{"testType": "success", "customerEmail": "chef@tkafrokitchen.com"}'
```

#### **Test Customer Confirmations:**
```bash
curl -X POST http://localhost:3001/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"email": "chef@tkafrokitchen.com"}'
```

### **Step 4: Check Email Logs**

#### **IONOS Email Logs:**
1. Log into IONOS control panel
2. Go to Email & Office → Logs
3. Check for failed delivery attempts
4. Look for authentication errors

#### **Application Logs:**
```bash
# Check Next.js server logs for email errors
# Look for patterns like:
# - "Email sending failed"
# - "SMTP authentication error"
# - "DNS resolution failed"
```

## 🛠️ **Common Solutions**

### **1. Authentication Issues**
**Symptoms**: "Authentication failed" errors
**Solutions**:
- Verify SMTP_USER and SMTP_PASSWORD are correct
- Check if account requires app-specific password
- Ensure account is not locked

### **2. DNS Issues**
**Symptoms**: "Domain does not accept mail" errors
**Solutions**:
- Verify MX records are correct
- Add missing SPF/DKIM records
- Check domain reputation

### **3. Rate Limiting**
**Symptoms**: "Too many requests" errors
**Solutions**:
- Implement email queuing
- Add delays between emails
- Use email service provider limits

### **4. Spam Filter Issues**
**Symptoms**: Emails not delivered to inbox
**Solutions**:
- Configure proper SPF/DKIM/DMARC
- Use consistent "From" addresses
- Avoid spam trigger words

## 📋 **Action Items**

### **Immediate Actions:**
1. ✅ **Verify IONOS account status**
2. ✅ **Test SMTP connection**
3. 🔄 **Configure DKIM signing**
4. 🔄 **Add DMARC record**
5. 🔄 **Test email delivery**

### **Monitoring:**
1. **Set up email delivery monitoring**
2. **Monitor bounce rates**
3. **Track email open rates**
4. **Check spam folder regularly**

## 🔗 **Useful Resources**

### **IONOS Support:**
- [IONOS Email Setup Guide](https://www.ionos.com/help/email/)
- [SMTP Configuration](https://www.ionos.com/help/email/set-up-email-accounts/smtp-settings/)
- [DNS Management](https://www.ionos.com/help/domains/dns-settings/)

### **Email Testing Tools:**
- [MXToolbox](https://mxtoolbox.com/) - DNS and email diagnostics
- [Mail Tester](https://www.mail-tester.com/) - Email deliverability testing
- [GlockApps](https://glockapps.com/) - Spam testing

## 📞 **Support Contacts**

### **IONOS Support:**
- **Phone**: 0800 731 0164
- **Email**: support@ionos.co.uk
- **Live Chat**: Available in control panel

### **Technical Issues:**
- **Email**: chef@tkafrokitchen.com
- **Developer**: Check application logs and error messages

---

**Last Updated**: July 20, 2025
**Status**: 🔄 In Progress - DKIM configuration needed 