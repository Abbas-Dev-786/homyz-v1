const express = require("express");
const authController = require("../controllers/authController");
const viewController = require("../controllers/viewController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.post(
  "/",
  viewController.setIds,
  viewController.checkViews,
  viewController.createView
);

module.exports = router;
