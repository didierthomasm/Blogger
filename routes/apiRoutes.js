const router = require('express').Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/users', userController.getAllUsers);

// Get a user by id
router.get('/user/:id', userController.getUserById);

// Get user by email
router.get('/user', userController.getUserByEmail);

module.exports = router;