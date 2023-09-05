const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "user required"],
    },
    property: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Property",
      required: [true, "property required"],
    },
    price: {
      type: Number,
      require: [true, "Transaction must have a price."],
    },
    status: {
      type: String,
      enum: {
        values: ["success", "failed"],
        default: "success",
        message: "Invalid value",
      },
    },
  },
  {
    timestamps: true,
    // virtuals: true,
    // toJSON: { virtuals: true },
    // toObject: { virtuals: true },
  }
);

transactionSchema.plugin(mongoosePaginate);

transactionSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "property",
    select: "title",
  });

  next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
