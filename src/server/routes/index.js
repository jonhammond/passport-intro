var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('../../../db/knex');
var passport = require('../lib/auth');
var helpers = require('../lib/helper');
var flash = require('connect-flash');

//route to render the index page when the / endpoint is hit
  router.get('/', helpers.ensureAuthenticated, function(req, res, next) {
    res.render('index', { title: 'Passport Intro', user: req.user });
  });

// route to display the login page when the /login endpoint is hit
  router.get('/login', function(req, res, next) {
    // console.log(req.flash());
    // console.log(req.flash());
    res.render('login', { title: 'Passport Login', message: req.flash('message') });
  });

//route to post login and authenticate with passport when the user clicks submit on the /login page
  router.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user) {
      if (err) {
        console.log('error:', err);
        return next(err);
      } else {
        req.logIn(user, function(err) {
          if (err) {
            console.log('error:', err);
            return next(err);
          } else {
            return res.redirect('/');
          }
        });
      }
    })(req, res, next);
  });

//route to redirect to the index when the /logout endpoint is hit
  router.get('/logout', helpers.ensureAuthenticated, function(req, res, next) {
    req.logout();
    res.redirect('/');
  });

//route to render the register page when the /register endpoint is hit
  router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register!' });
  });

//route to POST a new user to the database
  router.post('/register', function(req, res, next) {
    // console.log('form: ',req.body.email);
    var userEmail = req.body.email;
    var userPassword = req.body.password;
    // check if email is unique
    knex('users').where('email', userEmail)
    .then(function(data) {
      // if email is not unique, send an error
      // console.log('data:', data);
      if (data.length) {
        res.send('You fucked up');
      } else {
          // else insert email and password
          hashedPassword = helpers.hashing(userPassword);
          knex('users').insert({
          email: userEmail,
          password: hashedPassword
      }).then(function(data) {
          req.flash('message', {
            status: 'success',
            message: 'WELCOME!'
          });
          return res.redirect('/login');
      })
      .catch(function(err) {
          res.send('Well. Shit. Second to last catch');
        });
    }
      // res.send({ title: 'Passport Login', email: userEmail, password: userPassword });
    })
    .catch(function(err) {
      console.log('Last .catch:', err);
      return next('Final catch:', err);
    });
  });

module.exports = router;