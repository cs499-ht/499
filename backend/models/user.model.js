const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      trim: true, //trims whitespace
      minlength: 3,
    },
    PhoneNumber: { type: String },
    email: { type: String },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
