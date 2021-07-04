const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const getEntireDay = require('../utils/getEntireDay');

const LoggedFood = mongoose.model('loggedFoods');
const Meal = mongoose.model('meals');
const Log = mongoose.model('logs');

const updateLog = async (date) => {
  const meals = await Meal.find(getEntireDay(date));

  const mealsIDs = meals.map((meal) => new ObjectId(meal.id));

  const summedNutrients = await LoggedFood.aggregate([
    {
      $match: {
        _meal: { $in: mealsIDs },
      },
    },
    {
      $unwind: '$foodNutrients',
    },
    {
      $project: {
        foodNutrients: true,
      },
    },
    {
      $group: {
        _id: '$foodNutrients._trackedNutrient',
        amount: { $sum: '$foodNutrients.amount' },
      },
    },
    {
      $project: {
        _id: false,
        _trackedNutrient: '$_id',
        amount: true,
      },
    },
  ]);

  const log = await Log.findOneAndUpdate(
    getEntireDay(date),
    {
      targetsAchieved: summedNutrients,
    },
    { new: true }
  );

  return log;
};

module.exports = updateLog;
