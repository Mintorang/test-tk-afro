const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.log('Usage: node generate-password-hash.js <password>');
  console.log('Example: node generate-password-hash.js mySecurePassword123');
  process.exit(1);
}

async function generateHash() {
  try {
    const saltRounds = 12;
    const hash = await bcrypt.hash(password, saltRounds);
    
    console.log('\n=== Admin Password Hash Generated ===');
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nAdd this to your .env.local:');
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
    console.log('\nAnd set a secure JWT_SECRET:');
    console.log('JWT_SECRET=your-super-secure-jwt-secret-key-here');
    console.log('\n=====================================\n');
  } catch (error) {
    console.error('Error generating hash:', error);
  }
}

generateHash(); 