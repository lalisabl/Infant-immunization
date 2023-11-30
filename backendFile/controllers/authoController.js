const User = require("../models/User");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsynch");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const signToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);
  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.createNewAccount = catchAsync(async (req, res) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    fullName: req.body.fullName,
    phoneNumber: req.body.phoneNumber,
  });
  createSendToken(newUser, 201, res);
});

exports.loginUsers = catchAsync(async (req, res, next) => {
  const MAX_LOGIN_ATTEMPTS = 10;
  const LOCKOUT_DURATION = 5 * 60 * 1000; // 15 minutes in milliseconds
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  let user = await User.findOne({ username });
  if (!user) {
    return next(new AppError("Invalid email.", 401));
  }
  if (!user.isActive) {
    return next(new AppError("You are banned by the admin!", 403));
  }
  user = await User.findOne({ username }).select("+password");
  if (!(await user.validatePassword(password, user.password))) {
    return next(new AppError("Incorrect password", 401));
  }
  createSendToken(user, 200, res);
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("No user is belongs to this token", 401));
  }
  req.user = currentUser;
  next();
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
});
exports.restrictsto = (role) => {
  return (req, res, next) => {
    if (!(role === req.user.role)) {
      return next(
        new AppError(
          "You do not have permission to this perform this action!",
          403
        )
      );
    }
    next();
  };
};
exports.logoutUser = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};
