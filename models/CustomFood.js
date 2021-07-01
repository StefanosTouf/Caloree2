const mongoose = require('mongoose');
const { Schema } = mongoose;

const targetSchema = require('./Target');

const customFoodSchema = new Schema({
  description: String,
  foodNutrients: [targetSchema],
});

mongoose.model('customFoods', customFoodSchema);
