const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.co.uk',
  port: 465,
  secure: true,
  auth: {
    user: 'chef@tkafrokitchen.com',
    pass: 'tkafrokitchen2025'
  }
});

transporter.sendMail({
  from: 'chef@tkafrokitchen.com',
  to: 'chef@tkafrokitchen.com',
  subject: 'IONOS SMTP Test',
  text: 'This is a test email sent using IONOS SMTP and Nodemailer.'
}, (err, info) => {
  if (err) return console.error('IONOS SMTP test failed:', err);
  console.log('IONOS SMTP test sent:', info);
});
