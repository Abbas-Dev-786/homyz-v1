const express = require("express");
const propertyController = require("./../controllers/propertyController");

const router = express.Router();

router
  .route("/")
  .get(propertyController.getAllProperties)
  .post((req, res, next) => {
    req.body.location = {
      type: "Point",
      coordinates: req.body.location,
    };

    next();
  }, propertyController.createProperty);

router
  .route("/:id")
  .get(propertyController.getProperty)
  .patch(propertyController.updateProperty)
  .delete(propertyController.deleteProperty);

module.exports = router;
