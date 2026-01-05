const mongoose = require("mongoose");

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [120, "Title must be at most 120 characters"],
    },
    problem: {
      type: String,
      required: [true, "Problem is required"],
      trim: true,
      minlength: [10, "Problem must be at least 10 characters"],
      maxlength: [2000, "Problem must be at most 2000 characters"],
    },
    proposedSolution: {
      type: String,
      required: [true, "Proposed solution is required"],
      trim: true,
      minlength: [10, "Proposed solution must be at least 10 characters"],
      maxlength: [3000, "Proposed solution must be at most 3000 characters"],
    },
    targetAudience: {
      type: String,
      required: [true, "Target audience is required"],
      trim: true,
      minlength: [3, "Target audience must be at least 3 characters"],
      maxlength: [300, "Target audience must be at most 300 characters"],
    },
    tags: {
      type: [String],
      default: [],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

ideaSchema.pre("save", function (next) {
  if (Array.isArray(this.tags)) {
    this.tags = this.tags
      .map((t) => String(t).trim())
      .filter(Boolean)
      .slice(0, 20);
  }
  next();
});

module.exports = mongoose.model("Idea", ideaSchema);
