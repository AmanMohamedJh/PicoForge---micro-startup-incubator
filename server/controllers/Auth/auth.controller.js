const jwt = require("jsonwebtoken");
const User = require("../../models/Auth/auth.model");
const asyncHandler = require("../../utils/asyncHandler");

const signToken = (id) => {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw Object.assign(new Error("Missing JWT_SECRET"), { statusCode: 500 });

  return jwt.sign({ id }, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

exports.register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const existing = await User.findOne({ email: String(email).toLowerCase() });
  if (existing) {
    return res.status(409).json({ message: "Email already in use" });
  }

  const user = await User.create({
    fullName,
    email,
    password,
  });

  const token = signToken(user._id);

  res.status(201).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email: String(email).toLowerCase(),
  }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const ok = await user.comparePassword(password);
  if (!ok) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = signToken(user._id);

  res.json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
    },
  });
});

exports.me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
