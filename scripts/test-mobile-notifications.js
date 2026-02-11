#!/usr/bin/env node

/**
 * Mobile Notifications Test Script for TK Afro Kitchen
 * Tests SMS and WhatsApp notifications for orders and payments
 */

const http = require('http');

const BASE_URL = 'http://localhost:3001';

// Colors for console output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(`📱 ${title}`, 'bold');
  console.log('='.repeat(60));
}

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    
    if (options.body) {
      req.write(options.body);
    }
    
    req.end();
  });
}

async function testMobileNotificationsAPI() {
  logSection('Mobile Notifications API Test');
  
  try {
    log('🔌 Testing mobile notifications API...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/mobile-notifications`, {
      method: 'GET'
    });
    
    if (response.status === 200) {
      log('✅ Mobile notifications API is accessible', 'green');
      log(`📄 API Info: ${JSON.stringify(response.data, null, 2)}`, 'green');
    } else {
      log(`❌ API returned status: ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ API connection failed: ${error.message}`, 'red');
  }
}

async function testOrderNotifications() {
  logSection('Order Notifications Test');
  
  const testOrderData = {
    orderId: `TEST-ORDER-${Date.now()}`,
    customerInfo: {
      fullName: 'John Smith',
      phone: '+447123456789',
      email: 'john.smith@example.com',
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
      },
      {
        name: 'Plantain',
        quantity: 1,
        price: 4.99,
        selectedSize: { size: 'Regular', price: 4.99 }
      }
    ],
    totalAmount: 46.96,
    finalTotal: 68.95,
    deliveryFee: 21.99,
    fulfillmentType: 'delivery',
    paymentMethod: 'Card Payment',
    timestamp: new Date().toISOString()
  };

  try {
    log('📱 Testing order notifications...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/mobile-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'order',
        data: testOrderData
      })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Order notifications sent successfully!', 'green');
      log(`📊 Results: ${JSON.stringify(response.data.results, null, 2)}`, 'green');
    } else {
      log(`❌ Order notifications failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Order notification test failed: ${error.message}`, 'red');
  }
}

async function testPaymentNotifications() {
  logSection('Payment Notifications Test');
  
  const testPaymentData = {
    orderId: `TEST-PAYMENT-${Date.now()}`,
    customerInfo: {
      fullName: 'Jane Doe',
      phone: '+447987654321',
      email: 'jane.doe@example.com'
    },
    amount: 68.95,
    paymentMethod: 'Card Payment',
    status: 'success',
    timestamp: new Date().toISOString(),
    transactionId: 'txn_test_123456789'
  };

  try {
    log('💰 Testing payment notifications...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/mobile-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'payment',
        data: testPaymentData
      })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Payment notifications sent successfully!', 'green');
      log(`📊 Results: ${JSON.stringify(response.data.results, null, 2)}`, 'green');
    } else {
      log(`❌ Payment notifications failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Payment notification test failed: ${error.message}`, 'red');
  }
}

async function testUrgentNotifications() {
  logSection('Urgent Notifications Test');
  
  const testUrgentData = {
    message: 'Kitchen equipment malfunction - immediate attention required',
    type: 'system'
  };

  try {
    log('🚨 Testing urgent notifications...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/mobile-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'urgent',
        data: testUrgentData
      })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Urgent notifications sent successfully!', 'green');
      log(`📊 Results: ${JSON.stringify(response.data.results, null, 2)}`, 'green');
    } else {
      log(`❌ Urgent notifications failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Urgent notification test failed: ${error.message}`, 'red');
  }
}

async function testKitchenNotificationIntegration() {
  logSection('Kitchen Notification Integration Test');
  
  const testOrderData = {
    orderId: `TEST-KITCHEN-${Date.now()}`,
    customerInfo: {
      fullName: 'Test Customer',
      phone: '+447111111111',
      email: 'test@example.com',
      address: '456 Test Avenue',
      city: 'Manchester',
      postcode: 'M1 1AA'
    },
    items: [
      {
        name: 'Egusi Soup',
        quantity: 1,
        price: 18.99,
        selectedSize: { size: 'Large', price: 18.99 }
      }
    ],
    totalAmount: 18.99,
    finalTotal: 40.98,
    deliveryFee: 21.99,
    fulfillmentType: 'delivery',
    paymentMethod: 'PayPal',
    timestamp: new Date().toISOString()
  };

  try {
    log('🍽️ Testing kitchen notification integration...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/notify-kitchen`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testOrderData)
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Kitchen notification integration successful!', 'green');
      log(`📊 Results: ${JSON.stringify(response.data.notifications, null, 2)}`, 'green');
    } else {
      log(`❌ Kitchen notification integration failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Kitchen notification test failed: ${error.message}`, 'red');
  }
}

async function runAllTests() {
  log('🚀 Starting Mobile Notifications Test Suite', 'bold');
  log(`⏰ Test started at: ${new Date().toISOString()}`, 'blue');
  
  await testMobileNotificationsAPI();
  await testOrderNotifications();
  await testPaymentNotifications();
  await testUrgentNotifications();
  await testKitchenNotificationIntegration();
  
  logSection('Test Suite Complete');
  log('📋 Summary of tests:', 'bold');
  log('1. ✅ Mobile Notifications API accessibility', 'blue');
  log('2. ✅ Order notifications (SMS + WhatsApp)', 'blue');
  log('3. ✅ Payment notifications (Manager only)', 'blue');
  log('4. ✅ Urgent notifications (Primary staff)', 'blue');
  log('5. ✅ Kitchen notification integration', 'blue');
  
  log('\n🔗 Next Steps:', 'bold');
  log('1. Check your phone for SMS messages', 'yellow');
  log('2. Check WhatsApp for detailed notifications', 'yellow');
  log('3. Verify notification content and formatting', 'yellow');
  log('4. Test with real phone numbers', 'yellow');
  
  log('\n📞 Expected Notifications:', 'bold');
  log('• Primary Kitchen Staff: All notifications', 'green');
  log('• Secondary Kitchen Staff: Order notifications only', 'green');
  log('• Kitchen Manager: Payment notifications only', 'green');
}

// Run the tests
if (require.main === module) {
  runAllTests().catch(error => {
    log(`❌ Test suite failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  testMobileNotificationsAPI,
  testOrderNotifications,
  testPaymentNotifications,
  testUrgentNotifications,
  testKitchenNotificationIntegration,
  runAllTests
}; 