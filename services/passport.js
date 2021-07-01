const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');
const TrackedNutrient = mongoose.model('trackedNutrients');

passport.serializeUser((user, done) => {
  done(null, user.id); //user.id != profile.id, googleId. user.id is the id property in the mongoDb record
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser); //null = error object
      }

      const trackedNutrients = await TrackedNutrient.find();

      const generalTargets = trackedNutrients.map((nutrient) => {
        return { _trackedNutrient: nutrient.id };
      });

      const user = await new User({
        googleId: profile.id,
        generalTargets,
        name: profile.name.givenName,
      }).save();
      done(null, user);
    }
  )
);
