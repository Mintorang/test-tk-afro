import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { sendCustomerMessageNotification } from "@/lib/push-notifications";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Use the same SMTP configuration as the rest of the app
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ionos.co.uk',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Send notification email to chef
    await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL || 'chef@tkafrokitchen.com',
      to: "chef@tkafrokitchen.com",
      subject: "New Customer Message - TK Afro Kitchen",
      text: `
New Customer Message

Name: ${data.name}
Email: ${data.email}
Message: ${data.message}

Submitted on: ${new Date().toLocaleString()}
      `,
      html: `
        <h2>New Customer Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
      `,
    });

    // Send push notification
    try {
      const customerMessageData = {
        customerInfo: {
          fullName: data.name,
          email: data.email,
        },
        subject: "Customer Message from Website",
        message: data.message,
        timestamp: new Date().toISOString(),
        source: 'contact-form' as const
      };

      await sendCustomerMessageNotification(customerMessageData);
      console.log('✅ Push notification sent for customer message');
    } catch (pushError) {
      console.error('❌ Push notification failed:', pushError);
      // Don't fail the entire request if push notification fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}