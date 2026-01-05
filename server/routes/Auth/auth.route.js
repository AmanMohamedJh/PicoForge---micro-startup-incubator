const router = require("express").Router();
const ctrl = require("../../controllers/Auth/auth.controller");
const { protect } = require("../../middlewares/Auth/auth");
const {
  validateRegister,
  validateLogin,
} = require("../../validators/auth.validator");

router.post("/register", validateRegister, ctrl.register);
router.post("/login", validateLogin, ctrl.login);
router.get("/me", protect, ctrl.me);

module.exports = router;
