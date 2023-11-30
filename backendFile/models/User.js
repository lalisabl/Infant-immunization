const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "tell use your name"],
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["parent", "healthcareProvider"],
    default: "parent",
  },
  profession: {
    type: String,
    required: function () {
      return this.role === "healthcareProvider";
    },
    validate: {
      validator: function (profession) {
        return this.role !== "healthcareProvider" || !!profession;
      },
      message: "Profession is required for healthcare providers",
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.pre("save", function (next) {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  bcrypt.hash(this.password, saltRounds, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});
UserSchema.methods.validatePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model("User", UserSchema);
module.exports = User;
