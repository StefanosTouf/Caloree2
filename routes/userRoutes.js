const passport = require('passport');
const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('users');
const TrackedNutrient = mongoose.model('trackedNutrients');

module.exports = (app) => {
  app.get('/api/user', async (req, res) => {
    const populatedUser = await User.findById(req.user.id).populate({
      path: 'generalTargets',
      populate: {
        path: '_trackedNutrient',
        model: 'trackedNutrients',
      },
    });

    res.send(populatedUser);
  });

  app.patch('/api/user', async (req, res) => {
    const trackedNutrients = _.mapKeys(await TrackedNutrient.find(), 'name');
    const nutrients = req.body.generalTargets;

    const parsedNewNutrientTargets = [];
    for (let nutrient in trackedNutrients) {
      parsedNewNutrientTargets.push({
        _trackedNutrient: trackedNutrients[nutrient]._id,
        amount: nutrients[nutrient] || 0,
      });
    }

    req.user.generalTargets = parsedNewNutrientTargets;
    const user = await req.user.save();
    res.send(user);
  });
};
