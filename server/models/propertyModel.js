const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
module.exports = Property;
