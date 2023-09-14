'use strict'
const router = require('express').Router();
const {Post, User} = require('../models');
const blogController = require('../controllers/blogController');

router.get('/', async (req, res) => {
  try {
    // Get all posts
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));


    res.render('home', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
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