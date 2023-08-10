// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : { type: String, required: true },
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    institution : { type: String, required: true },
    address : { type: String },
    user_level : { type: Number, required: true },
});

module.exports = User = mongoose.model('user', UserSchema);