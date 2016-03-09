var express = require('express');
var router = express.Router();
var pg = require('pg');
var knex = require('knex');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport Intro' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Passport Login' });
});

router.post('/login', function(req, res, next) {
  console.log(req.body.email);
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  res.send({ title: 'Passport Login', email: userEmail, password: userPassword });
});

router.get('/logout', function(req, res, next) {
  res.redirect('/');
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register for Passport' });
});

router.post('/register', function(req, res, next) {
  console.log(req.body.email);
  var userEmail = req.body.email;
  var userPassword = req.body.password;
  res.send({ title: 'Passport Login', email: userEmail, password: userPassword });
});

module.exports = router;