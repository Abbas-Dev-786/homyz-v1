const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/verifyEmail/:token", authController.verifyEmail);

router.get("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updatePassword",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
