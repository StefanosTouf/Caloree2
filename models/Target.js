const mongoose = require('mongoose');
const { Schema } = mongoose;

const targetSchema = new Schema({
  _trackedNutrient: { type: Schema.Types.ObjectId, ref: 'TrackedNutrient' },
  amount: { type: Number, default: 0 },
});

module.exports = targetSchema; //is subdocument collection, not model
