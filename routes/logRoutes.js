const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const updateLog = require('../utils/updateLog');
const getEntireDay = require('../utils/getEntireDay');

const TrackedNutrient = mongoose.model('trackedNutrients');
const Log = mongoose.model('logs');

module.exports = (app) => {
  app.get('/api/logs', requireLogin, async (req, res) => {
    const populatedLog = await Log.findOne(
      getEntireDay(req.query.date)
    ).populate({
      path: 'targetsAchieved',
      populate: {
        path: '_trackedNutrient',
        model: 'trackedNutrients',
      },
    });
    res.send(populatedLog);
  });

  app.get('/api/logs/updatedLog', requireLogin, async (req, res) => {
    const { date } = req.query;

    console.log(req);
    const log = await updateLog(date);

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

    const log = await new Log({
      _user: req.user.id,
      targetsAchieved: targetsAchievedInit,
      date: new Date(date),
    }).save();

    res.send(log);
  });
};
