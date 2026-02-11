#!/usr/bin/env node

/**
 * Email Diagnostics Script for TK Afro Kitchen
 * Tests all aspects of the email system to identify issues
 */

const https = require('https');
const http = require('http');
const dns = require('dns').promises;

const BASE_URL = 'http://localhost:3001';
const TEST_EMAIL = 'chef@tkafrokitchen.com';

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
  console.log('\n' + '='.repeat(50));
  log(`🔍 ${title}`, 'bold');
  console.log('='.repeat(50));
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

async function testDNS() {
  logSection('DNS Configuration Test');
  
  try {
    // Test MX records
    log('📧 Testing MX records...', 'blue');
    const mxRecords = await dns.resolveMx('tkafrokitchen.com');
    log(`✅ MX Records found: ${mxRecords.length}`, 'green');
    mxRecords.forEach((record, index) => {
      log(`   ${index + 1}. ${record.exchange} (priority: ${record.priority})`, 'green');
    });
    
    // Test TXT records
    log('\n📝 Testing TXT records...', 'blue');
    const txtRecords = await dns.resolveTxt('tkafrokitchen.com');
    log(`✅ TXT Records found: ${txtRecords.length}`, 'green');
    txtRecords.forEach((record, index) => {
      log(`   ${index + 1}. ${record[0]}`, 'green');
    });
    
    // Test A record
    log('\n🌐 Testing A record...', 'blue');
    const aRecords = await dns.resolve4('tkafrokitchen.com');
    log(`✅ A Records found: ${aRecords.length}`, 'green');
    aRecords.forEach((record, index) => {
      log(`   ${index + 1}. ${record}`, 'green');
    });
    
  } catch (error) {
    log(`❌ DNS Test failed: ${error.message}`, 'red');
  }
}

async function testServerConnection() {
  logSection('Server Connection Test');
  
  try {
    log('🔌 Testing server connection...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/test-email`, {
      method: 'GET'
    });
    
    if (response.status === 200) {
      log('✅ Server is running and responding', 'green');
      log(`📄 Response: ${JSON.stringify(response.data)}`, 'green');
    } else {
      log(`❌ Server returned status: ${response.status}`, 'red');
    }
  } catch (error) {
    log(`❌ Server connection failed: ${error.message}`, 'red');
    log('💡 Make sure the development server is running on port 3001', 'yellow');
  }
}

async function testEmailSending() {
  logSection('Email Sending Test');
  
  try {
    log('📧 Testing email sending to chef@tkafrokitchen.com...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/test-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: TEST_EMAIL })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Email sent successfully!', 'green');
      log(`📧 Message ID: ${response.data.messageId}`, 'green');
    } else {
      log(`❌ Email sending failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Email test failed: ${error.message}`, 'red');
  }
}

async function testKitchenNotifications() {
  logSection('Kitchen Notification Test');
  
  try {
    log('👨‍🍳 Testing kitchen notification email...', 'blue');
    const response = await makeRequest(`${BASE_URL}/api/test-email-flow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        testType: 'success', 
        customerEmail: 'test@example.com' 
      })
    });
    
    if (response.status === 200 && response.data.success) {
      log('✅ Kitchen notification test completed', 'green');
      
      const results = response.data.results;
      if (results.kitchenEmail && results.kitchenEmail.success) {
        log(`✅ Kitchen email sent: ${results.kitchenEmail.messageId}`, 'green');
      } else {
        log(`❌ Kitchen email failed: ${results.kitchenEmail?.error}`, 'red');
      }
      
      if (results.confirmationEmail && results.confirmationEmail.success) {
        log(`✅ Confirmation email sent: ${results.confirmationEmail.messageId}`, 'green');
      } else {
        log(`❌ Confirmation email failed: ${results.confirmationEmail?.error}`, 'red');
      }
    } else {
      log(`❌ Kitchen notification test failed: ${JSON.stringify(response.data)}`, 'red');
    }
  } catch (error) {
    log(`❌ Kitchen notification test failed: ${error.message}`, 'red');
  }
}

async function testEnvironmentVariables() {
  logSection('Environment Variables Check');
  
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT', 
    'SMTP_USER',
    'SMTP_PASSWORD',
    'SMTP_FROM_EMAIL',
    'KITCHEN_EMAIL'
  ];
  
  log('🔧 Checking required environment variables...', 'blue');
  
  // Note: We can't directly access process.env from this script
  // This is a reminder for manual checking
  log('📋 Please verify these environment variables are set:', 'yellow');
  requiredVars.forEach(varName => {
    log(`   - ${varName}`, 'yellow');
  });
  
  log('\n💡 Current configuration should be:', 'blue');
  log('   SMTP_HOST=smtp.ionos.co.uk', 'green');
  log('   SMTP_PORT=465', 'green');
  log('   SMTP_USER=chef@tkafrokitchen.com', 'green');
  log('   SMTP_FROM_EMAIL=chef@tkafrokitchen.com', 'green');
  log('   KITCHEN_EMAIL=chef@tkafrokitchen.com', 'green');
}

async function runAllTests() {
  log('🚀 Starting Email Diagnostics for TK Afro Kitchen', 'bold');
  log(`⏰ Test started at: ${new Date().toISOString()}`, 'blue');
  
  await testDNS();
  await testServerConnection();
  await testEmailSending();
  await testKitchenNotifications();
  await testEnvironmentVariables();
  
  logSection('Diagnostics Complete');
  log('📋 Summary of findings:', 'bold');
  log('1. Check DNS configuration (MX, TXT, A records)', 'blue');
  log('2. Verify server is running on port 3001', 'blue');
  log('3. Test email sending functionality', 'blue');
  log('4. Check environment variables', 'blue');
  log('5. Review IONOS email account settings', 'blue');
  
  log('\n🔗 Next Steps:', 'bold');
  log('1. Configure DKIM signing in IONOS', 'yellow');
  log('2. Add DMARC record to DNS', 'yellow');
  log('3. Test email delivery to different providers', 'yellow');
  log('4. Monitor email logs for errors', 'yellow');
}

// Run the diagnostics
if (require.main === module) {
  runAllTests().catch(error => {
    log(`❌ Diagnostics failed: ${error.message}`, 'red');
    process.exit(1);
  });
}

module.exports = {
  testDNS,
  testServerConnection,
  testEmailSending,
  testKitchenNotifications,
  testEnvironmentVariables,
  runAllTests
}; 