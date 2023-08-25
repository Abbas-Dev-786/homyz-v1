const mongoose = require("mongoose");
const moment = require("moment");

const viewSchema = new mongoose.Schema(
  {
    property: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
      required: [true, "view should be of any property"],
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "view of property. should be booked by a user"],
    },

    startTime: {
      type: Date,
      required: [true, "start date is required"],
    },
    endTime: {
      type: Date,
    },
    day: {
      type: Date,
    },
  },
  { virtuals: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

viewSchema.pre("save", function (next) {
  this.endTime = moment(this.startTime).add(30, "m").toDate();

  this.day = new Date(this.startTime).toDateString();
  next();
});

const View = mongoose.model("View", viewSchema);
module.exports = View;
