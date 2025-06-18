// src/app/api/send-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    if (!process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD || !process.env.EMAIL_TO) {
      console.error("Email server environment variables are not set.");
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com', // Default to Gmail if not set
      port: parseInt(process.env.EMAIL_SERVER_PORT || '465'), // Default to 465 for Gmail SSL
      secure: (process.env.EMAIL_SERVER_PORT || '465') === '465', // true for 465 (SSL), false for other ports (like 587 for TLS)
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_SERVER_USER}>`, // Display name from form, actual sender is your server user
      replyTo: email, // User's email address
      to: process.env.EMAIL_TO, // Your receiving email
      subject: `New Contact Form Submission from ${name} via Portfolio`,
      text: `You have a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <html>
          <body>
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
            <hr>
            <p><small>This email was sent from your portfolio contact form.</small></p>
          </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully! I will get back to you soon.' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    let errorMessage = 'Failed to send message. Please try again or email me directly.';
    if (error instanceof Error) {
        // Provide more specific error details in logs, but generic to user
        console.error('Detailed error: ', error.message); 
        // Check for common nodemailer errors
        if (error.message.includes('Invalid login') || error.message.includes('Authentication unsuccessful')) {
            errorMessage = "Authentication failed. Please check server email credentials.";
        } else if (error.message.includes('ETIMEDOUT') || error.message.includes('ECONNREFUSED')) {
            errorMessage = "Could not connect to email server. Please check server host/port.";
        }
    }
    // For the client, send a more generic error unless you want to expose specific issues
    return NextResponse.json({ message: 'Failed to send message. Please try again.', errorDetails: process.env.NODE_ENV === 'development' ? errorMessage : undefined }, { status: 500 });
  }
}