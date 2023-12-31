const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");

const router = express.Router();

router.use(authController.protect);

router.get("/", authController.restrictTo("admin"), userController.getAllUsers);

router.route("/me").get(userController.setMe, userController.getUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.checkBody, userController.updatetUser)
  .delete(userController.deletetUser);

module.exports = router;
