const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userByPk = await User.findByPk(id);
    res.status(200).json(userByPk);
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userByEmail = await User.findOne(email);
    res.status(200).json(userByEmail);
  } catch (err) {
    res.status(500).json(err);
  }
}