// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name : { type: String, required: true },
  email : { type: String, required: true, unique: true },
  password : { type: String, required: true },
  institution : { type: String },
  address : { type: String },
  user_level : { type: Number, required: true },
  signup_date : { type : Date, default: Date.now },
	login_date : { type : Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);