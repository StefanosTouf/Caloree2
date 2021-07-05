const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const updateLog = require('../utils/updateLog');

const Meal = mongoose.model('meals');
const LoggedFood = mongoose.model('loggedFoods');

module.exports = (app) => {
  app.post('/api/meals', requireLogin, async (req, res) => {
    const { logId, name } = req.body;

    const meal = await new Meal({
      _user: req.user.id,
      _log: logId,
      name,
    }).save();

    res.send(meal);
  });

  app.get('/api/meals', requireLogin, async (req, res) => {
    const { logId } = req.query;
    const meals = await Meal.find({ _log: logId });
    res.send(meals);
  });

  app.get('/api/meals/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const meal = await Meal.findById(id);
    res.send(meal);
  });

  app.patch('/api/meals/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const meal = await Meal.findByIdAndUpdate(id, { name }, { new: true });
    res.send(meal);
  });

  app.delete('/api/meals/:id', requireLogin, async (req, res) => {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    await LoggedFood.deleteMany({ _meal: req.params.id });
    res.send({ meal });
  });
};
