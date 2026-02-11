# 🌐 Domain Migration Guide: HostGator to Vercel

## 📋 Pre-Migration Checklist

### Before Starting:
- [ ] Ensure your Vercel deployment is working correctly
- [ ] Backup your current HostGator website
- [ ] Note down current DNS settings
- [ ] Have access to both HostGator and Vercel accounts
- [ ] Plan for minimal downtime

---

## 🎯 Step 1: Vercel Domain Configuration

### 1.1 Add Domain to Vercel
1. **Login to Vercel Dashboard**
   - Go to https://vercel.com/dashboard
   - Select your tk-afro-kitchen project

2. **Add Custom Domain**
   - Click on "Settings" tab
   - Go to "Domains" section
   - Click "Add Domain"
   - Enter: `tkafrokitchen.com`
   - Click "Add"

3. **Get Vercel DNS Records**
   - Vercel will show you the required DNS records
   - Note down these records (you'll need them for HostGator)

### 1.2 Vercel DNS Configuration
Vercel typically requires these DNS records:

```bash
# A Record
Type: A
Name: @
Value: 76.76.19.36

# CNAME Record
Type: CNAME
Name: www
Value: cname.vercel-dns.com

# Additional A Records (if needed)
Type: A
Name: @
Value: 76.76.19.36
```

---

## 🎯 Step 2: HostGator DNS Management

### 2.1 Access HostGator DNS Settings
1. **Login to HostGator**
   - Go to https://portal.hostgator.com
   - Login with your credentials

2. **Access cPanel**
   - Find your domain: `tkafrokitchen.com`
   - Click on "cPanel" or "Manage"

3. **DNS Zone Editor**
   - In cPanel, find "DNS Zone Editor"
   - Click on "Zone Editor" or "DNS Zone Editor"

### 2.2 Backup Current DNS Settings
1. **Export Current Records**
   - Take screenshots of all current DNS records
   - Note down any custom records you want to keep
   - Save MX records for email (if using HostGator email)

### 2.3 Update DNS Records
1. **Remove Old A Records**
   - Find existing A records pointing to HostGator
   - Delete or modify them

2. **Add Vercel A Records**
   - Add new A record:
     - Type: A
     - Name: @ (or leave blank)
     - Value: 76.76.19.36
     - TTL: 3600 (or default)

3. **Update CNAME Record**
   - Find www CNAME record
   - Update to: `cname.vercel-dns.com`
   - Or add new if it doesn't exist

4. **Keep Essential Records**
   - **MX Records**: Keep if using HostGator email
   - **TXT Records**: Keep SPF, DKIM records
   - **CAA Records**: Keep if they exist

---

## 🎯 Step 3: Verification & Testing

### 3.1 DNS Propagation Check
1. **Check DNS Propagation**
   ```bash
   # Use these tools to check propagation:
   - https://www.whatsmydns.net/
   - https://dnschecker.org/
   - https://toolbox.googleapps.com/apps/dig/
   ```

2. **Expected Timeline**
   - DNS changes can take 24-48 hours to propagate globally
   - Some locations may see changes within 1-2 hours
   - Vercel typically works within 30 minutes

### 3.2 Vercel Domain Verification
1. **Check Vercel Dashboard**
   - Go to your project settings
   - Check domain status
   - Should show "Valid Configuration" when DNS is correct

2. **Test Website**
   - Visit `tkafrokitchen.com`
   - Should load your Vercel deployment
   - Check both `www.tkafrokitchen.com` and `tkafrokitchen.com`

---

## 🎯 Step 4: Email Configuration (If Using HostGator Email)

### 4.1 Keep Email Working
If you're using HostGator email services:

1. **Preserve MX Records**
   ```bash
   # Keep these MX records in HostGator:
   Type: MX
   Name: @
   Value: mail.tkafrokitchen.com
   Priority: 10
   ```

2. **Keep Email-Related Records**
   - SPF records
   - DKIM records
   - DMARC records
   - Any email-specific CNAME records

### 4.2 Alternative: Migrate to Vercel Email
Consider migrating to Vercel's email services:
- **Vercel Email**: Built-in email functionality
- **Resend**: Popular email service with Vercel integration
- **SendGrid**: Enterprise email solution

---

## 🎯 Step 5: SSL Certificate Setup

### 5.1 Vercel SSL
1. **Automatic SSL**
   - Vercel provides free SSL certificates
   - Automatically configured when DNS is correct
   - Supports both HTTP and HTTPS

2. **SSL Verification**
   - Check SSL status in Vercel dashboard
   - Test HTTPS access to your domain
   - Ensure redirects work properly

### 5.2 Force HTTPS
1. **Vercel Configuration**
   - Vercel automatically redirects HTTP to HTTPS
   - No additional configuration needed

---

## 🎯 Step 6: Post-Migration Tasks

### 6.1 Performance Optimization
1. **Cache Clearing**
   - Clear browser cache
   - Clear CDN cache if using
   - Test from different locations

2. **Speed Testing**
   - Run PageSpeed Insights
   - Check Core Web Vitals
   - Optimize if needed

### 6.2 Monitoring Setup
1. **Uptime Monitoring**
   - Set up uptime monitoring
   - Configure alerts for downtime
   - Monitor DNS propagation

2. **Analytics Verification**
   - Ensure Google Analytics is working
   - Check conversion tracking
   - Verify goal completions

---

## 🚨 Troubleshooting Common Issues

### Issue 1: Domain Not Loading
**Symptoms**: Domain shows HostGator page or error
**Solutions**:
- Check DNS propagation (can take 24-48 hours)
- Verify DNS records are correct
- Clear browser cache and try incognito mode
- Check Vercel domain configuration

### Issue 2: SSL Certificate Errors
**Symptoms**: Browser shows SSL warnings
**Solutions**:
- Wait for SSL certificate to be issued (up to 24 hours)
- Check DNS records are pointing to Vercel
- Clear SSL cache in browser
- Contact Vercel support if persistent

### Issue 3: Email Not Working
**Symptoms**: Can't send/receive emails
**Solutions**:
- Verify MX records are preserved
- Check email client settings
- Test email delivery
- Consider migrating to Vercel email services

### Issue 4: www vs non-www Issues
**Symptoms**: One version works, other doesn't
**Solutions**:
- Ensure both A and CNAME records are set
- Check Vercel redirect settings
- Verify DNS propagation for both versions

---

## 📞 Support Contacts

### Vercel Support:
- **Documentation**: https://vercel.com/docs
- **Support**: https://vercel.com/support
- **Community**: https://github.com/vercel/vercel/discussions

### HostGator Support:
- **Live Chat**: Available in HostGator portal
- **Phone**: Check your hosting plan for support number
- **Knowledge Base**: https://www.hostgator.com/help

---

## ✅ Migration Checklist

### Pre-Migration:
- [ ] Backup current website
- [ ] Test Vercel deployment
- [ ] Note current DNS settings
- [ ] Plan email migration strategy

### During Migration:
- [ ] Add domain to Vercel
- [ ] Update DNS records in HostGator
- [ ] Preserve email records
- [ ] Test domain propagation

### Post-Migration:
- [ ] Verify website loads correctly
- [ ] Test SSL certificate
- [ ] Check email functionality
- [ ] Monitor performance
- [ ] Update any hardcoded URLs

---

## 🎯 Expected Timeline

### Immediate (0-30 minutes):
- DNS changes made in HostGator
- Vercel domain configuration complete

### Short-term (30 minutes - 2 hours):
- Initial DNS propagation
- Vercel deployment accessible
- SSL certificate generation

### Medium-term (2-24 hours):
- Global DNS propagation
- Full SSL certificate deployment
- Complete migration verification

### Long-term (24-48 hours):
- Full global propagation
- Performance optimization
- Monitoring setup

---

*This migration will result in faster loading times, better performance, and easier deployment management with Vercel's platform.*