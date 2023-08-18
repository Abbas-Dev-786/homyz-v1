const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");
const crypto = require("crypto");

const ROLES = ["user", "admin", "agent"];

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "User must have firstName"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "User must have lastName"],
    },
    email: {
      type: String,
      trim: true,
      validate: [
        isEmail,
        "Email is not valid. Please enter valid email address",
      ],
      unique: [true, "User must have unique email address"],
      required: [true, "User must have email"],
    },
    emailVerifyToken: { type: String },
    password: {
      type: String,
      trim: true,
      select: false,
      minLength: [8, "Password should be atleast 8 characters long."],
      maxLength: [20, "Password should not exceed 20 characters."],
      required: [true, "User must have Password"],
    },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
    role: {
      type: String,
      enum: {
        values: ROLES,
        message: `Role must be either ${ROLES.join(", ")}.`,
        default: ROLES[0],
      },
    },
    authType: {
      type: String,
      select: false,
      default: "jwt",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePasswords = async (enteredPassword, storedPassword) =>
  await bcrypt.compare(enteredPassword, storedPassword);

userSchema.methods.createHashToken = async function (key) {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this[key] = crypto.createHash("sha256").update(resetToken).digest("hex");
  if (key === "passwordResetToken") {
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  }

  await this.save({ validateBeforeSave: false });

  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
