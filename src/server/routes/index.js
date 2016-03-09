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
  res.render('login', { title: 'Passport Login' });
});

module.exports = router;
