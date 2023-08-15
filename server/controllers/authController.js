const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const signToken = (id, authType) =>
  jwt.sign({ id, authType }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRES_IN,
  });

const createAndSendToken = (res, user) => {
  const token = signToken(user._id, user.authType);

  user.password = undefined;
  user.authType = undefined;
  user.isActive = undefined;
  user.updatedAt = undefined;

  res.status(200).json({ status: "success", data: { user, token } });
};

module.exports.register = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  user.password = undefined;
  user.authType = undefined;
  user.isActive = undefined;
  user.updatedAt = undefined;

  res.status(201).json({ status: "success", data: user });
});

module.exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const user = await User.findOne({ email });
  //   const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePasswords(password, user.password))) {
    return next(
      new AppError("Invalid credentials. Please check email or password", 400)
    );
  }

  if (!user.isActive) {
    return next(new AppError("user does not exists", 404));
  }

  if (!user.isVerified) {
    return next(
      new AppError(
        "A verification email has been sent to your email. Please verify your email."
      )
    );
  }

  createAndSendToken(res, user);
});

module.exports.protect = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  req.user = currentUser;
  next();
});

module.exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};
