const router = require("express").Router();
const ctrl = require("../../controllers/Idea/idea.controller");
const { protect } = require("../../middlewares/Auth/auth");
const {
  validateCreateIdea,
  validateIdeaId,
} = require("../../validators/idea.validator");

// Create (auth required)
router.post("/", protect, validateCreateIdea, ctrl.createIdea);

// List (public)
router.get("/", ctrl.listIdeas);

// Detail (public)
router.get("/:id", validateIdeaId, ctrl.getIdeaById);

module.exports = router;
