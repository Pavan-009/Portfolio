import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Create transporter with error handling and logging
const createTransporter = () => {
  try {
    const config = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };

    console.log('Creating SMTP transporter with config:', {
      ...config,
      auth: { user: config.auth.user, pass: '****' }, // Hide password in logs
    });

    const transporter = nodemailer.createTransport(config);

    // Verify connection
    transporter.verify((error) => {
      if (error) {
        console.error('SMTP Connection Error:', error);
      } else {
        console.log('SMTP Server is ready to send emails');
      }
    });

    return transporter;
  } catch (error) {
    console.error('Error creating SMTP transporter:', error);
    throw error;
  }
};

// @route   POST /api/contact
// @desc    Send contact email
// @access  Public
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  try {
    const transporter = createTransporter();

    console.log('Attempting to send email from:', process.env.SMTP_FROM);
    console.log('Sending to:', process.env.SMTP_TO);

    const mailOptions = {
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);

    res.json({ msg: 'Email sent successfully' });
  } catch (err) {
    console.error('Email error:', err);
    res.status(500).json({ 
      msg: 'Email could not be sent',
      error: err.message 
    });
  }
});

// @route   POST /api/contact/test
// @desc    Test email configuration
// @access  Private
router.post('/test', async (req, res) => {
  try {
    const transporter = createTransporter();

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: 'Test Email',
      text: 'This is a test email to verify SMTP configuration.',
    });

    console.log('Test email sent successfully:', info.messageId);
    res.json({ 
      msg: 'Test email sent successfully',
      messageId: info.messageId 
    });
  } catch (err) {
    console.error('Test email error:', err);
    res.status(500).json({ 
      msg: 'Test email failed',
      error: err.message 
    });
  }
});

export default router;