const { Resend } = require('resend');

const resend = new Resend('re_6VxJ5Yha_J5xxY8y6jebas5XEjhssZKP4');

async function testResend() {
  try {
    console.log('🧪 Testing Resend email service...');
    const result = await resend.emails.send({
      from: 'aws@crysolite.co.uk',
      to: 'aws@crysolite.co.uk',
      subject: 'Test Email from Resend',
      html: '<p>This is a test email sent using Resend API.</p>'
    });
    console.log('✅ Resend test successful!');
    console.log('📧 Email ID:', result.id);
    return result;
  } catch (error) {
    console.error('❌ Resend test failed:', error);
    throw error;
  }
}

testResend();
