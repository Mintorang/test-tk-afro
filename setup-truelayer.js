#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// TrueLayer credentials
const truelayerConfig = `
# TrueLayer Open Banking Configuration
TRUELAYER_CLIENT_ID=tkafrokitchen-36c905
TRUELAYER_CLIENT_SECRET=4eaf2107-89fe-45b6-9fe6-487f77c6e88b
TRUELAYER_REDIRECT_URI=https://tkafrokitchen.com/api/openbanking/callback
`;

// Path to .env.local file
const envPath = path.join(__dirname, '.env.local');

console.log('🔧 Setting up TrueLayer Open Banking credentials...\n');

try {
  // Check if .env.local exists
  if (fs.existsSync(envPath)) {
    console.log('📁 Found existing .env.local file');
    
    // Read existing content
    const existingContent = fs.readFileSync(envPath, 'utf8');
    
    // Check if TrueLayer config already exists
    if (existingContent.includes('TRUELAYER_CLIENT_ID')) {
      console.log('⚠️  TrueLayer credentials already exist in .env.local');
      console.log('   Please update manually if needed:\n');
      console.log(truelayerConfig);
    } else {
      // Append TrueLayer config
      const updatedContent = existingContent + '\n' + truelayerConfig;
      fs.writeFileSync(envPath, updatedContent);
      console.log('✅ Added TrueLayer credentials to .env.local');
    }
  } else {
    // Create new .env.local file
    fs.writeFileSync(envPath, truelayerConfig);
    console.log('✅ Created .env.local with TrueLayer credentials');
  }
  
  console.log('\n🎉 TrueLayer Open Banking setup complete!');
  console.log('\n📋 Next steps:');
  console.log('1. Restart your development server');
  console.log('2. Test Open Banking payment flow');
  console.log('3. Monitor payment processing');
  
} catch (error) {
  console.error('❌ Error setting up TrueLayer:', error.message);
  console.log('\n📝 Please manually add these to your .env.local file:\n');
  console.log(truelayerConfig);
} 