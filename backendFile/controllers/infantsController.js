const Infant = require("../models/Infant");
const User = require("../models/User");
const Vaccine = require("../models/Vaccine");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsynch");
exports.getAllInfants = catchAsync(async (req, res) => {
  const infants = await Infant.find();
  res.status(200).json({
    status: "success",
    data: infants,
  });
});
exports.addInfant = catchAsync(async (req, res) => {
  const newInfant = Infant.create(req.body);
  res.status(201).json({
    status: "success",
    data: newInfant,
  });
});
