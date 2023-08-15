const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { isEmail } = require("validator");

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
    password: {
      type: String,
      trim: true,
      select: false,
      minLength: [8, "Password should be atleast 8 characters long."],
      maxLength: [20, "Password should not exceed 20 characters."],
      required: [true, "User must have Password"],
    },
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
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

userSchema.methods.comparePasswords = async (enteredPassword, storedPassword) =>
  await bcrypt.compare(enteredPassword, storedPassword);

const User = mongoose.model("User", userSchema);
module.exports = User;
