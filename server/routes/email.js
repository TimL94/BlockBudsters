const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const APP_PASSWORD = process.env.APP_PASSWORD;
const STORE_EMAIL = process.env.STORE_EMAIL;

// Helper function to format phone numbers to 000-000-0000
const formatPhone = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  return match ? `${match[1]}-${match[2]}-${match[3]}` : phone;
};

router.post('/send-email', async (req, res) => {
  const { to = STORE_EMAIL, subject, text, customerPhone } = req.body;

  // Format phone number if provided
  const formattedText = customerPhone
    ? text.replace(customerPhone, formatPhone(customerPhone))
    : text;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"BlockBudsters Orders" <${EMAIL_USER}>`,
      to,
      subject,
      text: formattedText,
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
