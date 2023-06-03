const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true, trim: true, minlength: 3},
  gender: {type: Boolean, required: true},
  phone: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  old: {type: Number, required: true},
  intro: {type: String, required: true},
  score: {type: Number, default: 0},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;