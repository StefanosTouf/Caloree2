const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//Models
require('./models/User');
require('./models/CustomFood');
require('./models/Log');
require('./models/LoggedFood');
require('./models/Meal');
require('./models/Target');
require('./models/TrackedNutrient');

//Services
require('./services/passport');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //30 days in ms
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Routes
require('./routes/authRoutes')(app);
require('./routes/logRoutes')(app);
require('./routes/mealRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/loggedFoodsRoutes')(app);
require('./routes/customFoodsRoutes')(app);
require('./routes/usdaRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  //serves static assets if doesnt recognise route
  app.use(express.static('client/build'));

  //if it doesnt find what it needs in the client/build then it just returns the index.html
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}
const trackedN = [
  {
    name: 'Energy',
    unitName: 'KCAL',
    label: 'Energy',
    shortName: 'energy',
    unitLabel: 'Kcal',
  },
  {
    name: 'Protein',
    unitName: 'G',
    label: 'Protein',
    shortName: 'protein',
    unitLabel: 'g',
  },
  {
    name: 'Carbohydrate, by difference',
    unitName: 'G',
    label: 'Carbohydrate',
    shortName: 'carb',
    unitLabel: 'g',
  },
  {
    name: 'Total lipid (fat)',
    unitName: 'G',
    label: 'Fat',
    shortName: 'fat',
    unitLabel: 'g',
  },
  {
    name: 'Fiber, total dietary',
    unitName: 'G',
    label: 'Fiber',
    shortName: 'fiber',
    unitLabel: 'g',
  },
  {
    name: 'Sugars, total including NLEA',
    unitName: 'G',
    label: 'Sugars',
    shortName: 'sugars',
    unitLabel: 'g',
  },
  {
    name: 'Fatty acids, total monounsaturated',
    unitName: 'G',
    label: 'Monounsaturated Fats',
    shortName: 'mono',
    unitLabel: 'g',
  },
  {
    name: 'Fatty acids, total polyunsaturated',
    unitName: 'G',
    label: 'Polyunsaturated Fats',
    shortName: 'poly',
    unitLabel: 'g',
  },
  {
    name: 'Fatty acids, total saturated',
    unitName: 'G',
    label: 'Saturated Fats',
    shortName: 'saturated',
    unitLabel: 'g',
  },
  {
    name: 'Fatty acids, total trans',
    unitName: 'G',
    label: 'Trans Fats',
    shortName: 'trans',
    unitLabel: 'g',
  },
  {
    name: 'Fiber, total dietary',
    unitName: 'G',
    label: 'Fiber',
    shortName: 'fiber',
    unitLabel: 'g',
  },
  {
    name: 'Starch',
    unitName: 'G',
    label: 'Starch',
    shortName: 'starch',
    unitLabel: 'g',
  },
  {
    name: 'Sodium, Na',
    unitName: 'MG',
    label: 'Sodium',
    shortName: 'sodium',
    unitLabel: 'mg',
  },
  {
    name: 'Potassium, K',
    unitName: 'MG',
    label: 'Potassium',
    shortName: 'potassium',
    unitLabel: 'mg',
  },
  {
    name: 'Magnesium, Mg',
    unitName: 'MG',
    label: 'Magnesium',
    shortName: 'magnesium',
    unitLabel: 'mg',
  },
  {
    name: 'Alcohol, ethyl',
    unitName: 'G',
    label: 'Alcohol',
    shortName: 'alcohol',
    unitLabel: 'mg',
  },
];

const TrackedNutrient = mongoose.model('trackedNutrients');

for (let i of trackedN) {
  new TrackedNutrient(i).save();
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
