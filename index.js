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

const PORT = process.env.PORT || 5000;
app.listen(PORT);
