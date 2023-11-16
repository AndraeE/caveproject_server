// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    institution : { type: String },
    address : { type: String },
    user_level : { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', UserSchema);