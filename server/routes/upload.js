// server/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary'); // Your Cloudinary storage config

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

// Define a POST endpoint that processes a single file from field "file"
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  // Cloudinary adapter will store the uploaded file URL in req.file.path
  return res.status(200).json({ url: req.file.path });
});

module.exports = router;
