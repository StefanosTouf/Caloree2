const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const updateLog = require('../utils/updateLog');
const getEntireDay = require('../utils/getEntireDay');

const TrackedNutrient = mongoose.model('trackedNutrients');
const Log = mongoose.model('logs');
const populateTrackedNutrientsRefArray = require('../utils/populateTrackedNutrientsRefArray');

module.exports = (app) => {
  app.get('/api/logs', requireLogin, async (req, res) => {
    const { date } = req.query;
    await Log.findOne({
      date: new Date(date),
      _user: req.user._id,
    }).exec(async (err, doc) => {
      if (!doc) {
        return res.send({});
      }
      const populated = await populateTrackedNutrientsRefArray(
        doc,
        'targetsAchieved'
      );
      res.send(populated);
    });
  });

  app.get('/api/logs/updatedLog/:id', requireLogin, async (req, res) => {
    const { id } = req.params;
    const log = await updateLog(id);

    res.send(log);
  });

  app.post('/api/logs', requireLogin, async (req, res) => {
    const { date } = req.body;

    const existingLog = await Log.findOne(getEntireDay(date));

    if (existingLog) {
      res.status(403).send('Log already exists');
    }

    const trackedNutrients = await TrackedNutrient.find();

    const targetsAchievedInit = trackedNutrients.map((nutrient) => {
      return { _trackedNutrient: nutrient.id };
    });

    new Log({
      _user: req.user.id,
      targetsAchieved: targetsAchievedInit,
      date: new Date(date),
    })
      .save()
      .then(async (doc) => {
        const populated = await populateTrackedNutrientsRefArray(
          doc,
          'targetsAchieved'
        );
        res.send(populated);
      });
  });
};
