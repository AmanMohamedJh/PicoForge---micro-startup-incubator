// Central error handler
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid id",
    });
  }

  // Mongoose validation
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation error",
      errors: Object.values(err.errors || {}).map((e) => e.message),
    });
  }

  // Duplicate key
  if (err.code === 11000) {
    const fields = Object.keys(err.keyValue || {});
    return res.status(409).json({
      message: `Duplicate value for ${fields.join(", ")}`,
    });
  }

  res.status(statusCode).json({
    message: err.message || "Server error",
  });
};
