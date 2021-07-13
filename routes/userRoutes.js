const passport = require('passport');
const mongoose = require('mongoose');
const _ = require('lodash');

const User = mongoose.model('users');
const TrackedNutrient = mongoose.model('trackedNutrients');
const populateTrackedNutrientsRefArray = require('../utils/populateTrackedNutrientsRefArray');

module.exports = (app) => {
  app.get('/api/user', async (req, res) => {
    if (!req.user) {
      return res.send({});
    }
    User.findById(req.user._id).exec(async (err, doc) => {
      console.log(doc);
      if (!doc) {
        return res.send({});
      }
      const populated = await populateTrackedNutrientsRefArray(
        doc,
        'generalTargets'
      );
      res.send(populated);
    });
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
    req.user.save().then(async (doc) => {
      const populated = await populateTrackedNutrientsRefArray(
        doc,
        'generalTargets'
      );
      res.send(populated);
    });
  });
};
