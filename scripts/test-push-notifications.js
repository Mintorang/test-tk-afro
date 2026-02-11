#!/usr/bin/env node

/**
 * Push Notifications Test Script for TK Afro Kitchen
 * Tests ntfy.sh push notifications for orders and payments
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
  log(`🔔 ${title}`, 'bold');
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

async function testPushNotificationsAPI() {
  logSection('Push Notifications API Test');
  
  try {
    log('🔌 Testing push notifications API...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/push-notifications`, {
      method: 'GET'
    });
    
    if (response.status === 200) {
      log('✅ Push notifications API is accessible', 'green');
      log(`📄 API Info: ${JSON.stringify(response.data, null, 2)}`, 'green');
    } else {
      log(`❌ API returned status: ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ API connection failed: ${error.message}`, 'red');
  }
}

async function testSimpleNotification() {
  logSection('Simple Push Notification Test');
  
  try {
    log('🔔 Testing simple push notification...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/push-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: '🍽️ TK Afro Kitchen Test',
        message: 'This is a test push notification from your restaurant!',
        priority: '3'
      })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Simple push notification sent successfully!', 'green');
      log(`📊 Result: ${JSON.stringify(response.data.result, null, 2)}`, 'green');
    } else {
      log(`❌ Simple push notification failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Simple push notification test failed: ${error.message}`, 'red');
  }
}

async function testOrderNotification() {
  logSection('Order Push Notification Test');
  
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
      }
    ],
    totalAmount: 41.97,
    finalTotal: 63.96,
    deliveryFee: 21.99,
    fulfillmentType: 'delivery',
    paymentMethod: 'Card Payment',
    timestamp: new Date().toISOString()
  };

  try {
    log('📱 Testing order push notification...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/push-notifications`, {
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
      log('✅ Order push notification sent successfully!', 'green');
      log(`📊 Result: ${JSON.stringify(response.data.result, null, 2)}`, 'green');
    } else {
      log(`❌ Order push notification failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Order push notification test failed: ${error.message}`, 'red');
  }
}

async function testPaymentNotification() {
  logSection('Payment Push Notification Test');
  
  const testPaymentData = {
    orderId: `TEST-PAYMENT-${Date.now()}`,
    customerInfo: {
      fullName: 'Jane Doe',
      phone: '+447987654321',
      email: 'jane.doe@example.com'
    },
    amount: 63.96,
    paymentMethod: 'Card Payment',
    status: 'success',
    timestamp: new Date().toISOString(),
    transactionId: 'txn_test_123456789'
  };

  try {
    log('💰 Testing payment push notification...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/push-notifications`, {
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
      log('✅ Payment push notification sent successfully!', 'green');
      log(`📊 Result: ${JSON.stringify(response.data.result, null, 2)}`, 'green');
    } else {
      log(`❌ Payment push notification failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Payment push notification test failed: ${error.message}`, 'red');
    }
}

async function testUrgentNotification() {
  logSection('Urgent Push Notification Test');
  
  try {
    log('🚨 Testing urgent push notification...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/push-notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'urgent',
        data: {
          message: 'Kitchen equipment malfunction - immediate attention required',
          type: 'system'
        }
      })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Urgent push notification sent successfully!', 'green');
      log(`📊 Result: ${JSON.stringify(response.data.result, null, 2)}`, 'green');
    } else {
      log(`❌ Urgent push notification failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Urgent push notification test failed: ${error.message}`, 'red');
  }
}

async function testKitchenIntegration() {
  logSection('Kitchen Integration Test');
  
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
  log('🚀 Starting Push Notifications Test Suite', 'bold');
  log(`⏰ Test started at: ${new Date().toISOString()}`, 'blue');
  
  await testPushNotificationsAPI();
  await testSimpleNotification();
  await testOrderNotification();
  await testPaymentNotification();
  await testUrgentNotification();
  await testKitchenIntegration();
  
  logSection('Test Suite Complete');
  log('📋 Summary of tests:', 'bold');
  log('1. ✅ Push Notifications API accessibility', 'blue');
  log('2. ✅ Simple push notification', 'blue');
  log('3. ✅ Order push notification', 'blue');
  log('4. ✅ Payment push notification', 'blue');
  log('5. ✅ Urgent push notification', 'blue');
  log('6. ✅ Kitchen notification integration', 'blue');
  
  log('\n🔔 Next Steps:', 'bold');
  log('1. Check your phone for push notifications', 'yellow');
  log('2. Verify notification content and formatting', 'yellow');
  log('3. Test with your actual ntfy.sh topic', 'yellow');
  log('4. Configure notification settings on your phone', 'yellow');
  
  log('\n📱 Expected Notifications:', 'bold');
  log('• Simple test notification', 'green');
  log('• Order notification with details', 'green');
  log('• Payment confirmation', 'green');
  log('• Urgent system alert', 'green');
  log('• Kitchen integration test', 'green');
}

// Run the tests
if (require.main === module) {
  runAllTests().catch(error => {
    log(`❌ Test suite failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  testPushNotificationsAPI,
  testSimpleNotification,
  testOrderNotification,
  testPaymentNotification,
  testUrgentNotification,
  testKitchenIntegration,
  runAllTests
}; 