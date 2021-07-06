const mongoose = require('mongoose');
const _ = require('lodash');

const TrackedNutrient = mongoose.model('trackedNutrients');

const roundNutrientAmount = (amount, modifier) => {
  const roundedAmount = Math.round(amount * modifier) / modifier;
  if (roundedAmount < 0) {
    return 0;
  } else {
    return roundedAmount;
  }
};

module.exports = async (nutrients) => {
  const acceptedCorrectlyLabeledNutrients = [];

  const trackedNutrients = _.mapKeys(
    (await TrackedNutrient.find().lean()).map((nutrient) => {
      return {
        ...nutrient,
        amount: 0,
      };
    }),
    'name'
  );

  const completeNutrients = _.concat(
    _.differenceBy(
      Object.values(trackedNutrients),
      nutrients,
      _.property('name')
    ),
    nutrients
  );

  for (let nutrient of completeNutrients) {
    if (trackedNutrients[nutrient.name]) {
      if (!nutrient.unitName) {
        nutrient = {
          ...nutrient,
          unitName: trackedNutrients[nutrient.name].unitName,
        };

        acceptedCorrectlyLabeledNutrients.push({
          ...nutrient,
          ...trackedNutrients[nutrient.name],
          ['amount']: nutrient.amount
            ? roundNutrientAmount(nutrient.amount, 10)
            : 0,
        });
      } else if (
        trackedNutrients[nutrient.name].unitName === nutrient.unitName
      ) {
        acceptedCorrectlyLabeledNutrients.push({
          ...nutrient,
          ...trackedNutrients[nutrient.name],
          ['amount']: nutrient.amount
            ? roundNutrientAmount(nutrient.amount, 10)
            : 0,
        });
      }
    }
  }

  return acceptedCorrectlyLabeledNutrients;
};
