const router = require("express").Router();
const ctrl = require("../../controllers/Auth/auth.controller");
const {
  validateRegister,
  validateLogin,
} = require("../../validators/auth.validator");

router.post("/register", validateRegister, ctrl.register);
router.post("/login", validateLogin, ctrl.login);
router.get("/me", ctrl.protect, ctrl.me);

module.exports = router;
