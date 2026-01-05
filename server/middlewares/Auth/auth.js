const jwt = require("jsonwebtoken");
const User = require("../../models/Auth/auth.model");
const asyncHandler = require("../../utils/asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res.status(500).json({ message: "Missing JWT_SECRET" });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const user = await User.findById(decoded.id).select("fullName email");
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  next();
});

module.exports = { protect };
