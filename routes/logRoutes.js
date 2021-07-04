const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const TrackedNutrient = mongoose.model('trackedNutrients');
const Log = mongoose.model('logs');

module.exports = (app) => {
  app.get('/api/logs', requireLogin, async (req, res) => {
    console.log(req.query);

    const log = await Log.findOne({
      date: {
        $gte: new Date(req.query.date).setHours(0, 0, 0, 0),
        $lt: new Date(req.query.date).setHours(24, 0, 0, 0),
      },
    });
    res.send(log);
  });

  app.post('/api/logs', requireLogin, async (req, res) => {
    const existingLog = await Log.findOne({
      date: {
        $gte: new Date(req.query.date).setHours(0, 0, 0, 0),
        $lt: new Date(req.query.date).setHours(24, 0, 0, 0),
      },
    });

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
      date: Date.now(),
    }).save();

    res.send(log);
  });
};
