const User = require("../models/User");
const Vaccine = require("../models/Vaccine");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsynch");
exports.addVaccine = catchAsync(async (req, res) => {
  const newVaccine = await Vaccine.create(req.body);
  await addVaccineAndUpdateInfant(
    newVaccine._id,
    newVaccine.addedDate,
    req.user.id
  );
  res.status(201).json({
    status: "success",
    data: newVaccine,
  });
});
