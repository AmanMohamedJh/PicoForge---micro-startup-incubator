const Idea = require("../../models/Idea/idea.model");
const asyncHandler = require("../../utils/asyncHandler");

exports.createIdea = asyncHandler(async (req, res) => {
  const { title, problem, proposedSolution, targetAudience, tags } = req.body;

  const idea = await Idea.create({
    title,
    problem,
    proposedSolution,
    targetAudience,
    tags: Array.isArray(tags) ? tags : [],
    createdBy: req.user._id,
  });

  const populated = await Idea.findById(idea._id).populate(
    "createdBy",
    "fullName email"
  );

  res.status(201).json({ idea: populated });
});

exports.listIdeas = asyncHandler(async (req, res) => {
  const ideas = await Idea.find({})
    .sort({ createdAt: -1 })
    .select("title problem tags createdBy createdAt")
    .populate("createdBy", "fullName");

  res.json({ ideas });
});

exports.getIdeaById = asyncHandler(async (req, res) => {
  const idea = await Idea.findById(req.params.id).populate(
    "createdBy",
    "fullName email"
  );

  if (!idea) {
    return res.status(404).json({ message: "Idea not found" });
  }

  res.json({ idea });
});
