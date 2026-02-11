# 🚀 DNS Migration Quick Reference

## 📋 Current Status
- **Current Host**: HostGator
- **New Host**: Vercel
- **Domain**: tkafrokitchen.com
- **Goal**: Point domain to Vercel deployment

---

## 🎯 Step-by-Step Process

### Step 1: Add Domain to Vercel
1. Go to https://vercel.com/dashboard
2. Select your tk-afro-kitchen project
3. Click "Settings" → "Domains"
4. Click "Add Domain"
5. Enter: `tkafrokitchen.com`
6. Click "Add"

### Step 2: Get Vercel DNS Records
After adding the domain, Vercel will show you the required DNS records. They typically look like this:

```bash
# A Record (Root Domain)
Type: A
Name: @ (or leave blank)
Value: 76.76.19.36
TTL: 3600

# CNAME Record (www subdomain)
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Step 3: Update HostGator DNS
1. Login to HostGator: https://portal.hostgator.com
2. Find your domain and click "cPanel"
3. Look for "DNS Zone Editor" or "Zone Editor"
4. Update the records as shown below

---

## 🔧 Exact DNS Records to Set

### Remove/Update These Records:
```bash
# OLD A Records (remove or update)
Type: A
Name: @
Value: [HostGator IP] ← Remove this
```

### Add These New Records:
```bash
# NEW A Record (Root Domain)
Type: A
Name: @ (or leave blank)
Value: 76.76.19.36
TTL: 3600

# NEW CNAME Record (www subdomain)
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600
```

### Keep These Records (Don't Change):
```bash
# MX Records (for email)
Type: MX
Name: @
Value: mail.tkafrokitchen.com
Priority: 10

# TXT Records (for email authentication)
Type: TXT
Name: @
Value: v=spf1 include:hostgator.com ~all

# Any other custom records you have
```

---

## ⚡ Quick Migration Steps

### 1. In Vercel (5 minutes):
- [ ] Add domain: `tkafrokitchen.com`
- [ ] Copy the DNS records shown
- [ ] Note the verification status

### 2. In HostGator (10 minutes):
- [ ] Login to cPanel
- [ ] Go to DNS Zone Editor
- [ ] Update A record to: `76.76.19.36`
- [ ] Update CNAME record to: `cname.vercel-dns.com`
- [ ] Keep MX and TXT records unchanged

### 3. Verification (5 minutes):
- [ ] Check Vercel dashboard for "Valid Configuration"
- [ ] Test domain: `tkafrokitchen.com`
- [ ] Test www: `www.tkafrokitchen.com`

---

## 🕐 Timeline Expectations

### Immediate (0-30 minutes):
- DNS changes take effect
- Vercel starts serving your site

### Short-term (30 minutes - 2 hours):
- SSL certificate generated
- Global propagation begins

### Full Propagation (24-48 hours):
- All DNS servers worldwide updated
- Complete migration verified

---

## 🚨 Common Issues & Solutions

### Issue: Domain still shows HostGator page
**Solution**: 
- Clear browser cache
- Try incognito mode
- Check DNS propagation: https://dnschecker.org

### Issue: SSL certificate errors
**Solution**:
- Wait up to 24 hours for SSL generation
- Check DNS records are correct
- Contact Vercel if persistent

### Issue: Email not working
**Solution**:
- Verify MX records are preserved
- Check email client settings
- Test email delivery

---

## 📞 Support Resources

### Vercel Support:
- **Documentation**: https://vercel.com/docs/domains
- **Support**: https://vercel.com/support
- **Status**: https://vercel-status.com

### HostGator Support:
- **Live Chat**: Available in portal
- **Knowledge Base**: https://www.hostgator.com/help

### DNS Check Tools:
- **Global Check**: https://dnschecker.org
- **Propagation**: https://www.whatsmydns.net
- **Dig Tool**: https://toolbox.googleapps.com/apps/dig/

---

## ✅ Success Checklist

After migration, verify:
- [ ] `tkafrokitchen.com` loads your Vercel site
- [ ] `www.tkafrokitchen.com` loads your Vercel site
- [ ] SSL certificate is active (https://)
- [ ] Email still works (if using HostGator email)
- [ ] All website functionality works
- [ ] Vercel dashboard shows "Valid Configuration"

---

*This migration will give you faster loading times, automatic SSL, and easier deployment management with Vercel.* 