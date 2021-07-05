const mongoose = require('mongoose');
const { Schema } = mongoose;

const targetSchema = require('./Target');

const loggedFoodSchema = new Schema({
  fdcId: String,
  description: String,
  foodNutrients: [targetSchema],
  _meal: { type: Schema.Types.ObjectId, ref: 'Meal' },
  amount: Number,
  unitName: String,
  date: Date,
});

mongoose.model('loggedFoods', loggedFoodSchema);
