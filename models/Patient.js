// models/Patient.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  doctorName: { type: String, required: true },
  surgeryName: { type: String, required: false }, // Only required for IP
  diagnostics: { type: String, required: false }, // Only required for OP
  medications: { type: String, required: false }, // Only required for OP
  radiologyInterpretation: { type: String, required: false }, // Only required for OP
  nextFollowUpDate: { type: Date, required: false }, // Only required for OP
  prescription: { type: String, required: true },
  patientName: { type: String, required: true },
  patientPhone: { type: String, required: true },
  patientID: { type: String, required: true },
  patientGender: { type: String, required: true },
  type: { type: String, required: true }, // 'IP' or 'OP'
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Patient', patientSchema);
