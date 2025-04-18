// server/routes/email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const STORE_EMAIL = process.env.STORE_EMAIL;
const APP_PASSWORD = process.env.APP_PASSWORD;
const EMAIL_USER = process.env.EMAIL_USER;

router.post('/send-email', async (req, res) => {
  const { subject, text, customerEmail } = req.body;
  console.log('Received email request:', { subject, text, customerEmail });

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: APP_PASSWORD
      }
    });

    // Send to store
    await transporter.sendMail({
      from: `"BlockBudsters Orders" <${EMAIL_USER}>`,
      to: STORE_EMAIL,
      subject,
      text
    });

    // Send to customer (if available)
    if (customerEmail) {
      await transporter.sendMail({
        from: `"BlockBudsters Orders" <${EMAIL_USER}>`,
        to: customerEmail,
        subject,
        text
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Email send failed:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
