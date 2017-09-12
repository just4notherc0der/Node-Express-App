const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const dbconfig = require('./database');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  // local strategy
  passport.use(new localStrategy((username, password, done) => {
    // match username
    let query = { username };
    User.findOne(query, (err, user) => {
      if(err) throw err;
      if(!user) {
        return done(null, false, { message: 'No user found' });
      }
      // match the password
      bcrypt.compare(password, user.password, (err, matches) => {
        if(err) throw err;
        if(matches) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Wrong password' });
        }
      });
    });
  }));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
