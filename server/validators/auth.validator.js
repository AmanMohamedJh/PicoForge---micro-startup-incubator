const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const validateRegister = (req, res, next) => {
  const { fullName, email, password } = req.body || {};
  const errors = {};

  if (!fullName || !String(fullName).trim()) {
    errors.fullName = "Full name is required";
  } else if (String(fullName).trim().length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  if (!email || !String(email).trim()) {
    errors.email = "Email is required";
  } else if (!isEmail(String(email).trim())) {
    errors.email = "Invalid email";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (String(password).length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body || {};
  const errors = {};

  if (!email || !String(email).trim()) {
    errors.email = "Email is required";
  } else if (!isEmail(String(email).trim())) {
    errors.email = "Invalid email";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
