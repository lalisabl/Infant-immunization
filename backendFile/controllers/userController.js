const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsynch");
exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    data: users,
  });
});
// view profile
exports.getMe = catchAsync(async (req, res, next) => {
  req.params.userId = req.user.id;
  next();
});
exports.getOneUser = catchAsync(async (req, res, next) => {
  let query = User.findById(req.params.userId);
  const user = await query;
  if (!user) {
    return next(new AppError("No User found with this ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError("No User found with this ID", 404));
  }
  user.isActive = user.isActive == false ? true : false;
  await user.save();
  return res.status(204).json({
    status: "success",
    data: {
      user: user,
    },
  });
});
exports.updateOne = catchAsync(async (req, res, next) => {
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});
