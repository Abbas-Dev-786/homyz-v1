const Property = require("../models/propertyModel");
const factory = require("./FactoryHandler");

module.exports.getAllProperties = factory.getAllDocs(Property);

module.exports.getProperty = factory.getDoc(Property);

module.exports.updateProperty = factory.updateDoc(Property);

module.exports.deleteProperty = factory.deleteDoc(Property);

module.exports.createProperty = factory.createDoc(Property);
