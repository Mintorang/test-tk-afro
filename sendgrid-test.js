const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: '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'
  }
});

transporter.sendMail({
  from: 'aws@crysolite.co.uk',
  to: 'aws@crysolite.co.uk',
  subject: 'Test Email from SendGrid SMTP',
  text: 'This is a test email sent using SendGrid SMTP and Nodemailer.'
}, (err, info) => {
  if (err) return console.error('SendGrid SMTP test failed:', err);
  console.log('SendGrid SMTP test sent:', info);
});
