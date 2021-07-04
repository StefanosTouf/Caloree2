const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const updateLog = require('../utils/updateLog');
const _ = require('lodash');

const LoggedFood = mongoose.model('loggedFoods');
const Meal = mongoose.model('meals');
const TrackedNutrient = mongoose.model('trackedNutrients');

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

    const loggedFood = await new LoggedFood({
      fdcId,
      description,
      foodNutrients: formatedFoodNutrients,
      _meal: mealId,
      amount,
      unitName,
    }).save();

    res.send(loggedFood);
  });

  app.get('/api/loggedFoods', requireLogin, async (req, res) => {
    const { mealId } = req.query;

    const loggedFoods = await LoggedFood.find({ _meal: mealId }).select({
      foodNutrients: false,
    });
    res.send({ loggedFoods });
  });

  app.delete('/api/loggedFoods/:id', requireLogin, async (req, res) => {
    const { id } = req.params;

    const deletionInfo = await LoggedFood.findByIdAndDelete(id);

    res.send(deletionInfo);
  });
};
