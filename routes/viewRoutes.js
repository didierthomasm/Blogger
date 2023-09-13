'use strict'
const router = require('express').Router();
const blogController = require('../controllers/blogController');

router.get('/', (req, res) => {
  res.render('home', blogController.getAllPosts());
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/sign-up', (req, res) => {
  res.render('register');
});

router.get('/profile', (req, res) => {
  if (req.session && req.session.logged_in) {
    res.render('profile');
  } else {
    res.render('login');
  }
});

module.exports = router;