const mongoose = require('mongoose');
const { Schema } = mongoose;

const trackedNutrientSchema = new Schema({
  name: String,
  unitName: String,
  label: String,
  shortName: String,
  unitLabel: String,
});

mongoose.model('trackedNutrients', trackedNutrientSchema);
