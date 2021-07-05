const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  _log: { type: Schema.Types.ObjectId, ref: 'Log' },
  name: String,
});

mongoose.model('meals', mealSchema);
