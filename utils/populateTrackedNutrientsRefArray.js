const mongoose = require('mongoose');

module.exports = async (doc, trackedNutrientsArrayRefKey) => {
  return await doc
    .populate({
      path: trackedNutrientsArrayRefKey,
      populate: {
        path: '_trackedNutrient',
        model: 'trackedNutrients',
      },
    })
    .execPopulate();
};
