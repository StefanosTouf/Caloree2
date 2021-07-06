const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const _ = require('lodash');

const CustomFood = mongoose.model('customFoods');
const TrackedNutrient = mongoose.model('trackedNutrients');

module.exports = (app) => {
  app.get('/api/customFoods', requireLogin, async (req, res) => {
    const query = req.query.query || '';
    const limit = Number.parseInt(req.query.limit) || 50;
    const page = req.query.page || 1;

    const customFoods = await CustomFood.find(
      {
        description: { $regex: '.*' + query + '.*', $options: 'i' },
        _user: req.user._id,
      },
      { foodNutrients: false }
    ).limit(limit);

    res.send(customFoods);
  });

  app.get('/api/customFoods/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const customFood = await CustomFood.find({ _id: id, _user: req.user._id });

    res.send(customFood);
  });

  app.post('/api/customFoods', requireLogin, async (req, res) => {
    const { description, nutrients } = req.body;

    const trackedNutrients = _.mapKeys(await TrackedNutrient.find(), 'name');

    const parsedNewNutrientTargets = [];
    for (let nutrient in trackedNutrients) {
      parsedNewNutrientTargets.push({
        _trackedNutrient: trackedNutrients[nutrient].id,
        amount: nutrients[nutrient] || 50,
      });
    }

    const customFood = await new CustomFood({
      description,
      foodNutrients: parsedNewNutrientTargets,
      _user: req.user._id,
    }).save();

    res.send(customFood);
  });
};
