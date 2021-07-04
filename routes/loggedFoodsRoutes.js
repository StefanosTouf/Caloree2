const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const LoggedFood = mongoose.model('loggedFoods');
const TrackedNutrient = mongoose.model('trackedNutrients');

module.exports = (app) => {
  app.post('/api/loggedFoods', requireLogin, async (req, res) => {
    const { fdcId, description, mealId, amount, unitName } = req.body;

    const trackedNutrients = await TrackedNutrient.find();

    const foodNutrients = trackedNutrients.map((nutrient) => {
      return { _trackedNutrient: nutrient.id, amount: 100 };
    });

    const loggedFood = await new LoggedFood({
      fdcId,
      description,
      foodNutrients,
      _meal: mealId,
      amount,
      unitName,
    }).save();

    res.send(loggedFood);
  });

  app.get('/api/loggedFoods', requireLogin, async (req, res) => {
    const { mealId } = req.query;

    const loggedFoods = await LoggedFood.find({ _meal: mealId });
    res.send({ loggedFoods });
  });

  app.delete('/api/loggedFoods', requireLogin, async (req, res) => {
    console.log(req);
    const { loggedFoodsIds } = req.query;

    const deletionInfo = await LoggedFood.deleteMany({
      _id: {
        $in: loggedFoodsIds,
      },
    });

    res.send(deletionInfo);
  });
};
