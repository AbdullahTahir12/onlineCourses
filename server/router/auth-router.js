const express = require("express");
const { signupSchema, loginSchema } = require("../validators/auth-validator");
const validate = require("../middleware/validate_middleware");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();
const authController = require("../controllers/auth-controller");

// router.get("/", (req, res) => {
//   res.status(200).send("welcome to auth router page");
// });

router.route("/").get(authController.home);

router.route("/register").post(validate(signupSchema), authController.register);
router.route("/login").post(validate(loginSchema), authController.login);
router.route("/user").get(authMiddleware, authController.user);
module.exports = router;
