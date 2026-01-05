const mongoose = require("mongoose");

const validateCreateIdea = (req, res, next) => {
  const { title, problem, proposedSolution, targetAudience, tags } =
    req.body || {};
  const errors = {};

  const isNonEmpty = (v) =>
    v !== undefined && v !== null && String(v).trim().length;

  if (!isNonEmpty(title)) errors.title = "Title is required";
  if (!isNonEmpty(problem)) errors.problem = "Problem is required";
  if (!isNonEmpty(proposedSolution))
    errors.proposedSolution = "Proposed solution is required";
  if (!isNonEmpty(targetAudience))
    errors.targetAudience = "Target audience is required";

  if (tags !== undefined) {
    if (!Array.isArray(tags)) {
      errors.tags = "Tags must be an array";
    }
  }

  if (Object.keys(errors).length) {
    return res.status(400).json({ message: "Validation error", errors });
  }

  next();
};

const validateIdeaId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }
  next();
};

module.exports = {
  validateCreateIdea,
  validateIdeaId,
};
