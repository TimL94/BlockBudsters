const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const APP_PASSWORD = process.env.APP_PASSWORD;
const STORE_EMAIL = process.env.STORE_EMAIL;

router.post('/send-email', async (req, res) => {
  const { to = STORE_EMAIL, subject, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: APP_PASSWORD
      }
    });

    await transporter.sendMail({
      from: `"BlockBudsters Ordering" <${EMAIL_USER}>`,
      to,
      subject,
      text
    });

    res.json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
