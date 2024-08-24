// index.js
/*
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Patient model
const Patient = require('./models/Patient');

// IP Form Submission
app.post('/api/ip', upload.single('prescription'), async (req, res) => {
  try {
    const patientData = new Patient({
      doctorName: req.body.doctorName,
      surgeryName: req.body.surgeryName,
      prescription: req.file.path,
      patientName: req.body.patientName,
      patientPhone: req.body.patientPhone,
      patientID: req.body.patientID,
      patientGender: req.body.patientGender,
      type: 'IP',
    });

    await patientData.save();
    res.status(201).json({ message: 'IP Form Submitted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// OP Form Submission
app.post('/api/op', upload.single('prescription'), async (req, res) => {
  try {
    const patientData = new Patient({
      doctorName: req.body.doctorName,
      diagnostics: req.body.diagnostics,
      medications: req.body.medications,
      radiologyInterpretation: req.body.radiologyInterpretation,
      nextFollowUpDate: req.body.nextFollowUpDate,
      prescription: req.file.path,
      patientName: req.body.patientName,
      patientPhone: req.body.patientPhone,
      patientID: req.body.patientID,
      patientGender: req.body.patientGender,
      type: 'OP',
    });

    await patientData.save();
    res.status(201).json({ message: 'OP Form Submitted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Error handling for file upload errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File Upload Error', error: err.message });
  }
  next(err);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
*/
// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Patient model
const Patient = require('./models/Patient');

// IP Form Submission
app.post('/api/ip', upload.fields([{ name: 'prescription', maxCount: 3 }]), async (req, res) => {
  try {
    const patientData = new Patient({
      doctorName: req.body.doctorName,
      surgeryName: req.body.surgeryName,
      prescription: req.files['prescription'][0].path,
      patientName: req.body.patientName,
      patientPhone: req.body.patientPhone,
      patientID: req.body.patientID,
      patientGender: req.body.patientGender,
      type: 'IP',
    });

    await patientData.save();
    res.status(201).json({ message: 'IP Form Submitted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// OP Form Submission
app.post('/api/op', upload.fields([{ name: 'prescription', maxCount: 3 }]), async (req, res) => {
  try {
    const patientData = new Patient({
      doctorName: req.body.doctorName,
      diagnostics: req.body.diagnostics,
      medications: req.body.medications,
      radiologyInterpretation: req.body.radiologyInterpretation,
      nextFollowUpDate: req.body.nextFollowUpDate,
      prescription: req.files['prescription'][0].path,
      patientName: req.body.patientName,
      patientPhone: req.body.patientPhone,
      patientID: req.body.patientID,
      patientGender: req.body.patientGender,
      type: 'OP',
    });

    await patientData.save();
    res.status(201).json({ message: 'OP Form Submitted Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Error handling for file upload errors
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: 'File Upload Error', error: err.message });
  }
  next(err);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
