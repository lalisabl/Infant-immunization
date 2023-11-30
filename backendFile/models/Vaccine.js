const mongoose = require("mongoose");

const vaccineSchema = new mongoose.Schema({
  vaccineName: {
    type: String,
    required: true,
  },
  vaccineId: {
    type: String,
    maxlength: 6,
    unique: true,
  },
  dose: {
    type: Number,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: "",
  },
  isVaccinated: {
    type: Boolean,
    default: false,
  },
  weekOfAge: {
    type: Number,
    required: true,
  },
});

const Vaccine = mongoose.model("Vaccine", vaccineSchema);
module.exports = Vaccine;
