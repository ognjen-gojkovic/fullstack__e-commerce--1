const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name."],
    maxlength: [30, "Your name cannot exceed 30 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email."],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minlength: [6, "Your password must be at least 6 characters long."],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: {
      type: String,
      default: "user",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

/**
 * @desc
 * hash password
 */
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(15);
  this.password = await bcrypt.hash(this.password, salt);
});

/**
 * @desc
 * validate password
 */
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * @desc
 * generate access token
 */
UserSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRE,
  });
};

/**
 * @desc
 * generate refresh token
 */
UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
};

/**
 * @desc
 * generate forgot password token
 */
UserSchema.methods.generateResetPasswordToken = function () {
  // generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // hash token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set expire time
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", UserSchema);
