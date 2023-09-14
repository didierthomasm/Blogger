'use strict'
const router = require('express').Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');
const {User, Post} = require("../models");

// Get all users
router.get('/user', userController.getAllUsers);

// Get a user by id
router.get('/user/:id', userController.getUserById);

// Get user by email
router.get('/user', userController.getUserByEmail);

// Get all posts
router.get('/post', blogController.getAllPosts);

// Create new user
router.post('/user/signup', async (req, res) => {
  try {
    const newUser = await User.create({
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err){
    console.error(err);
    res.status(500).send('Error registering user.')
  }
});

router.post('/user/login', async (req, res) => {
  try {
    const userData = await User.findOne( { where: { email: req.body.email }});
    const validPassword = await userData.checkPassword(req.body.password);
    if (!userData || !validPassword) {
      res
        .status(400)
        .json( { message: 'Incorrect email or password! '});
        return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json( { user: userData, message: 'You are now logged in!' });
    })


  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;