const mongoose = require('mongoose');
const { Schema } = mongoose;

const targetSchema = require('./Target');

const userSchema = new Schema({
  googleId: String,
  name: String,
  generalTargets: [targetSchema],
});

mongoose.model('users', userSchema);
