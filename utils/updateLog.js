const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const _ = require('lodash');

const LoggedFood = mongoose.model('loggedFoods');
const Meal = mongoose.model('meals');
const Log = mongoose.model('logs');
const TrackedNutrient = mongoose.model('trackedNutrients');

const updateLog = async (logId) => {
  const meals = await Meal.find({ _log: logId });

  const mealsIDs = meals.map((meal) => new ObjectId(meal.id));

  const initNutrients = (
    await TrackedNutrient.find().select({ _id: true })
  ).map(({ _id }) => {
    return {
      _trackedNutrient: _id,
      amount: 0,
    };
  });

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

  const mapKeySummedNutrients = _.mapKeys(summedNutrients, '_trackedNutrient');

  const completeSummedNutrients = initNutrients.map(
    ({ _trackedNutrient, amount }) => {
      return {
        _trackedNutrient,
        amount:
          (mapKeySummedNutrients[_trackedNutrient]
            ? mapKeySummedNutrients[_trackedNutrient].amount
            : 0) + amount,
      };
    }
  );

  console.log('aaaa', completeSummedNutrients, summedNutrients);

  const log = await Log.findByIdAndUpdate(
    logId,
    {
      targetsAchieved: completeSummedNutrients,
    },
    { new: true }
  ).populate({
    path: 'targetsAchieved',
    populate: {
      path: '_trackedNutrient',
      model: 'trackedNutrients',
    },
  });

  return log;
};

module.exports = updateLog;
