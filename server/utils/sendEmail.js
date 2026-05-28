const nodemailer = require('nodemailer');

/**
 * Utility function to send emails
 * Supports SMTP (default) or Mailtrap HTTP API (to bypass ISP port blocking)
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject line
 * @param {string} options.html - HTML body content
 */
const sendEmail = async ({ to, subject, html }) => {
  // If Mailtrap API credentials are provided, use HTTP API to bypass firewall port blocks
  if (process.env.MAILTRAP_API_TOKEN && process.env.MAILTRAP_SANDBOX_ID) {
    try {
      const response = await fetch(`https://sandbox.api.mailtrap.io/api/send/${process.env.MAILTRAP_SANDBOX_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MAILTRAP_API_TOKEN}`
        },
        body: JSON.stringify({
          from: {
            email: process.env.SMTP_FROM_EMAIL || 'noreply@hmastore.com',
            name: process.env.SMTP_FROM_NAME || 'HMA Store'
          },
          to: [{ email: to }],
          subject: subject,
          html: html
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors ? JSON.stringify(data.errors) : 'API error');
      }
      console.log('Email sent via Mailtrap API:', data);
      return data;
    } catch (error) {
      console.error('Error sending email via Mailtrap API:', error);
      throw new Error('Email delivery failed: ' + error.message);
    }
  }

  try {
    // Create reusable transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email/username
        pass: process.env.SMTP_PASS, // your password or app password
      },
    });

    // Setup email data
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME || 'HMA Store'}" <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    };

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email via SMTP:', error);
    throw new Error('Email delivery failed: ' + error.message);
  }
};

module.exports = sendEmail;
