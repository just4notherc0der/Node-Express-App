const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// load User model
let User = require('../models/user');

// Register form
router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  let newUser = new User({
    name,
    username,
    email,
    password
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) {
        console.log(err);
      }
      newUser.password = hash;
      newUser.save((err) => {
        if(err) {
          console.log(err);
          return;
        } else {
          res.redirect('/users/login');
        }
      })
    });
  });
});

/* VALIDATION
  if(errors) {

    console.log(errors);
    errors.then(e => console.log(e)).then(data => console.log(data));

    res.render('register', { errors });
  } else {
    let newUser = new User({
      name,
      username,
      email,
      password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) {
          console.log(err);
        }
        newUser.password = hash;
        newUser.save((err) => {
          if(err) {
            console.log(err);
            return;
          } else {
            res.redirect('/users/login');
          }
        })
      });
    });
  }
});*/



// login
router.get('/login', (req, res) => {
  res.render('login');
})

module.exports = router;
