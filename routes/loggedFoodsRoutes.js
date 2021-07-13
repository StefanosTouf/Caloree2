const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const _ = require('lodash');

const LoggedFood = mongoose.model('loggedFoods');
const TrackedNutrient = mongoose.model('trackedNutrients');
const populateTrackedNutrientsRefArray = require('../utils/populateTrackedNutrientsRefArray');

module.exports = (app) => {
  app.post('/api/loggedFoods', requireLogin, async (req, res) => {
    const { fdcId, description, mealId, amount, unitName, foodNutrients } =
      req.body;

    const trackedNutrients = _.mapKeys(await TrackedNutrient.find(), 'name');

    const formatedFoodNutrients = foodNutrients.map((nutrient) => {
      return {
        _trackedNutrient: trackedNutrients[nutrient.name]._id,
        amount: nutrient.amount,
      };
    });

    new LoggedFood({
      fdcId,
      description,
      foodNutrients: formatedFoodNutrients,
      _meal: mealId,
      amount,
      unitName,
      _user: req.user._id,
    })
      .save()
      .then(async (doc) => {
        const populatedLoggedFood = await populateTrackedNutrientsRefArray(
          doc,
          'foodNutrients'
        );
        res.send(populatedLoggedFood);
      });
  });

  app.post(
    '/api/loggedFoods/copyLoggedFood/:id',
    requireLogin,
    async (req, res) => {
      const { id } = req.params;
      const { mealId } = req.body;
      const existingFood = await LoggedFood.findById(id).lean();
      await new LoggedFood({
        ...existingFood,
        _meal: mealId,
        _id: undefined,
      })
        .save()
        .then(async (doc) => {
          const populatedLoggedFood = await populateTrackedNutrientsRefArray(
            doc,
            'foodNutrients'
          );

          res.send(populatedLoggedFood);
        });
    }
  );

  app.get('/api/loggedFoods', requireLogin, async (req, res) => {
    const { mealId } = req.query;

    LoggedFood.find({ _meal: mealId }).exec(async (err, docs) => {
      const populatedLoggedFoods = await Promise.all(
        docs.map(async (doc) => {
          const populated = await populateTrackedNutrientsRefArray(
            doc,
            'foodNutrients'
          );
          return populated;
        })
      );

      res.send(populatedLoggedFoods);
    });
  });

  app.delete('/api/loggedFoods/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    const deletedFood = await LoggedFood.findByIdAndDelete(id);

    res.send(deletedFood);
  });
};
