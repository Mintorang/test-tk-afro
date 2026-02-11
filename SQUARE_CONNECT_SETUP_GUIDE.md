# Square Connect Setup Guide - Payment Facilitator Model

## 🏗️ **Payment Facilitator Architecture**

This guide shows how to set up **Square Connect** so you can be the payment facilitator for multiple restaurant clients, similar to how Stripe Connect works.

### **How It Works:**
1. **You** (Platform) have the main Square account
2. **Your Clients** (Restaurants) get sub-accounts under your platform
3. **Payments** go directly to their bank accounts
4. **You** handle all technical setup and compliance
5. **They** just receive payments automatically

## 📋 **Step 1: Square Platform Account Setup**

### **1.1 Create Square Platform Account**
1. Go to [developer.squareup.com](https://developer.squareup.com)
2. Sign up for a **Square Platform** account (not regular merchant account)
3. Complete business verification for your platform
4. Get approved for **Square Connect** (payment facilitation)

### **1.2 Platform Application Setup**
1. Create a new application: `TK Afro Kitchen Platform`
2. Enable **Square Connect** in your application
3. Get platform credentials:
   - **Platform Application ID** (starts with `sq0idp-`)
   - **Platform Access Token** (starts with `EAAA`)
   - **Platform Location ID** (starts with `L`)
   - **Platform Client Secret** (for OAuth)

### **1.3 Configure Platform Webhooks**
1. Set webhook endpoint: `https://tkafrokitchen.com/api/square/webhooks`
2. Select events:
   - `payment.created`
   - `payment.updated`
   - `payment.completed`
   - `payment.failed`
   - `merchant.created`
   - `merchant.updated`
   - `merchant.deleted`

## 🔧 **Step 2: Environment Variables**

Add these to your `.env.local`:

```bash
# Square Platform Configuration
SQUARE_PLATFORM_APP_ID=sq0idp-xxxxxxxxxxxxxxxxxxxxx
SQUARE_PLATFORM_ACCESS_TOKEN=EAAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SQUARE_PLATFORM_LOCATION_ID=Lxxxxxxxxxxxxxxxxxxxxx
SQUARE_PLATFORM_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Square Connect Settings
SQUARE_CONNECT_WEBHOOK_URL=https://tkafrokitchen.com/api/square/webhooks
SQUARE_CONNECT_REDIRECT_URL=https://tkafrokitchen.com/api/square/connect/callback

# Public Platform App ID (for frontend)
NEXT_PUBLIC_SQUARE_PLATFORM_APP_ID=sq0idp-xxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SQUARE_PLATFORM_LOCATION_ID=Lxxxxxxxxxxxxxxxxxxxxx
```

## 🔧 **Step 3: Client Onboarding Flow**

### **3.1 Client Registration Process**
1. **Client signs up** on your platform
2. **You create** Square Connect onboarding link
3. **Client authorizes** their Square account
4. **Payments flow** directly to their bank account
5. **You get platform fees** automatically

### **3.2 Onboarding Steps**
```typescript
// 1. Create client account
const clientId = `client-${Date.now()}`;

// 2. Generate onboarding URL
const onboardingUrl = await createSquareConnectLink(clientId, businessName);

// 3. Client completes authorization
// 4. Store client access token
// 5. Start processing payments
```

## 🔧 **Step 4: Payment Processing**

### **4.1 Client-Specific Payments**
```typescript
// Each payment includes clientId
const paymentRequest = {
  source_id: sourceId,
  client_id: clientId, // Your client's ID
  amount_money: {
    amount: formatAmountForSquare(amount),
    currency: 'GBP'
  },
  location_id: clientAccount.locationId,
  note: `Order: ${orderId} (${clientAccount.businessName})`
};

// Use client's access token
const response = await fetch('https://connect.squareup.com/v2/payments', {
  headers: {
    'Authorization': `Bearer ${clientAccount.accessToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(paymentRequest)
});
```

### **4.2 Settlement Flow**
1. **Customer pays** → Payment processed through client's Square account
2. **Square settles** → Money goes directly to client's bank account
3. **Platform fees** → Automatically deducted by Square
4. **Client receives** → Full payment minus platform fees

## 💰 **Revenue Model**

### **Platform Fees Structure**
- **Your Platform Fee**: 0.5% + 10p per transaction
- **Square Fee**: 1.9% + 20p per transaction
- **Total Client Cost**: 2.4% + 30p per transaction
- **Your Profit**: 0.5% + 10p per transaction

### **Example Revenue**
| Monthly Volume | Your Revenue | Client Savings vs Stripe |
|----------------|--------------|-------------------------|
| £10,000 | £60 | £110 |
| £25,000 | £135 | £275 |
| £50,000 | £260 | £550 |

## 🔧 **Step 5: Database Schema**

### **Client Accounts Table**
```sql
CREATE TABLE client_accounts (
  id VARCHAR(255) PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  merchant_id VARCHAR(255),
  location_id VARCHAR(255),
  status ENUM('pending', 'active', 'suspended') DEFAULT 'pending',
  bank_account_id VARCHAR(255),
  settlement_schedule ENUM('same_day', 'next_day', 'weekly') DEFAULT 'same_day',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### **Payments Table**
```sql
CREATE TABLE payments (
  id VARCHAR(255) PRIMARY KEY,
  client_id VARCHAR(255) NOT NULL,
  order_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GBP',
  status VARCHAR(50) NOT NULL,
  square_payment_id VARCHAR(255),
  platform_fee DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES client_accounts(id)
);
```

## 🔧 **Step 6: Admin Interface**

### **6.1 Client Management Dashboard**
- **Add new clients** with business details
- **Generate onboarding links** for Square Connect
- **Monitor client status** (pending, active, suspended)
- **View payment history** per client
- **Manage settlement schedules**

### **6.2 Payment Analytics**
- **Revenue per client**
- **Platform fee earnings**
- **Payment success rates**
- **Settlement tracking**
- **Client performance metrics**

## 🧪 **Step 6: Testing**

### **6.1 Sandbox Testing**
1. **Create test client accounts**
2. **Test onboarding flow**
3. **Process test payments**
4. **Verify settlement flow**
5. **Test webhook notifications**

### **6.2 Production Testing**
1. **Onboard real clients**
2. **Process small test payments**
3. **Verify bank settlements**
4. **Monitor platform fees**
5. **Test error handling**

## 🚀 **Step 7: Production Deployment**

### **7.1 Platform Verification**
1. **Complete Square platform verification**
2. **Provide business documentation**
3. **Set up platform bank account**
4. **Configure settlement schedules**
5. **Test with real payments**

### **7.2 Client Onboarding**
1. **Create client onboarding process**
2. **Automate account creation**
3. **Set up client notifications**
4. **Provide client support**
5. **Monitor client success**

## 📊 **Benefits for Your Business**

### **Immediate Benefits**
- ✅ **Recurring Revenue**: Platform fees from all clients
- ✅ **Scalable Model**: Add clients without technical overhead
- ✅ **Client Retention**: Clients locked into your platform
- ✅ **Competitive Advantage**: Lower fees than Stripe Connect

### **Long-term Benefits**
- ✅ **Business Growth**: Platform becomes valuable asset
- ✅ **Market Expansion**: Easy to add new restaurant clients
- ✅ **Data Insights**: Payment analytics across all clients
- ✅ **Exit Strategy**: Platform can be sold or acquired

## 🎯 **Success Metrics**

### **Platform Metrics**
- **Number of active clients**
- **Monthly payment volume**
- **Platform fee revenue**
- **Client retention rate**
- **Payment success rate**

### **Client Metrics**
- **Onboarding completion rate**
- **Payment processing time**
- **Settlement speed**
- **Client satisfaction**
- **Support ticket volume**

## 🛠 **Next Steps**

1. **Complete Square platform application**
2. **Set up environment variables**
3. **Test onboarding flow**
4. **Onboard first client**
5. **Monitor and optimize**

---

**This setup gives you the power of Stripe Connect with Square's lower fees and faster settlement!** 🚀 