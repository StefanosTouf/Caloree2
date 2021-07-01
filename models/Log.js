const mongoose = require('mongoose');
const { Schema } = mongoose;

const targetSchema = require('./Target');

const logSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  targetsAchieved: [targetSchema],
});

mongoose.model('logs', logSchema);
