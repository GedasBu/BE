const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name must be provided"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email must be provided"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please privide valid email"],
  },
  photo: {
    type: String,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    required: [true, "Password must be provided"],
    minlength: [8, "Password must have min 8 characters"],
    // do not show password when sending data to the client
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm password"],
    // This only works on SAVE!
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match!",
    },
  },
});

userSchema.pre("save", async function (next) {
  // function only runs if password is modified
  if (!this.isModified("password")) return next();
  //set password to encrypted version with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    console.log(changedTimestamp, JWTTimeStamp);
    return JWTTimeStamp < changedTimestamp;
  }
  //False means not changed
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
