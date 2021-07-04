const mongoose = require('mongoose');
const { Schema } = mongoose;

const mealSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  name: String,
});

mealSchema.pre('remove', (next) => {
  console.log('in remove middleware');
  next();
});

mongoose.model('meals', mealSchema);
