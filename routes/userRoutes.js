const passport = require('passport');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const TrackedNutrient = mongoose.model('trackedNutrients');

module.exports = (app) => {
  app.get('/api/user', (req, res) => {
    console.log(req);
    res.send(req.user);
  });

  app.patch('/api/user', async (req, res) => {
    const trackedNutrients = TrackedNutrient.find();
    const newNutrientTargets = req.params.nutrientTargets;

    const parsedNewNutrientTargets = [];
    for (let nutrient in newNutrientTargets) {
      parsedNewNutrientTargets.push({
        _trackedNutrient: trackedNutrients[nutrient].id,
        amount: newNutrientTargets[nutrient],
      });
    }

    req.user.generalTargets = parsedNewNutrientTargets;
    const user = await req.user.save();
    res.send(user);
  });
};
