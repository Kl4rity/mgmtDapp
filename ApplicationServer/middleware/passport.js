const passport = require('passport');
const User = require('../models/User');
const FacebookStrategy = require('passport-facebook').Strategy;
const debug = require('debug')('app:passport');
const credentials = require('../secrets/keys');

module.exports = () => {

  debug('module.exports executed.');

  passport.use(new FacebookStrategy({
    clientID: credentials.passport.facebook.app_id,
    clientSecret: credentials.passport.facebook.app_secret,
    callbackURL: credentials.passport.facebook.callback,
    profileFields:['id','displayName','emails'],
    // passReqToCallback : true,
    enableProof: true,
    session: true
  },
  function(accessToken, refreshToken, profile, done) {
    debug("in Strategy function");
    User.findOrCreate({email: profile.emails[0].value, username: profile.displayName},
      function(err, user) {
        if (err) {
          debug(err);
          return done(err);
        } else {
        done(null, user);
       }
    });
  }
));

  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
          done(err, user);
      });
  });

  debug(passport); 
}
