const Infant = require("../models/Infant");
const Vaccine = require("../models/Vaccine");
const mongoose = require("mongoose");
exports.getAllInfant = async (req, res) => {
  try {
    const infants = await Infant.find();
    res.status(200).json({
      status: "success",
      data: infants,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
