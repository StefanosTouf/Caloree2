const mongoose = require('mongoose');
const { Schema } = mongoose;

const targetSchema = require('./Target');

const customFoodSchema = new Schema({
  description: String,
  foodNutrients: [targetSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('customFoods', customFoodSchema);
