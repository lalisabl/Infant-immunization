const mongoose = require("mongoose");
const Vaccine = require("./Vaccine");
const User = require("./User");
const infantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  address: {
    type: String,
    required: true,
  },
  infantId: {
    type: String,
    maxlength: 6,
    unique: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vaccines: [
    {
      vaccine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vaccine",
      },
      date: {
        type: Date,
        required: true,
      },
      healthcareProvider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
});

infantSchema.methods.addVaccineAndUpdateInfant = async function (
  vaccineId,
  date,
  healthcareProviderId
) {
  try {
    // Find the vaccine by ID
    const vaccine = await Vaccine.findById(vaccineId);
    if (!vaccine) {
      throw new Error("Vaccine not found");
    }
    const dob = new Date(this.dob);
    const ageInWeeks = Math.floor((date - dob) / (7 * 24 * 60 * 60 * 1000));
    if (ageInWeeks >= vaccine.weekOfAge) {
      this.vaccines.push({
        vaccine: vaccineId,
        date,
        healthcareProvider: healthcareProviderId,
      });
      await this.save();
    }
  } catch (error) {
    throw error;
  }
};
const Infant = mongoose.model("Infant", infantSchema);
module.exports = Infant;
