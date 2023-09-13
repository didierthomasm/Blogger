const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
  try {
    return await Post.findAll();
  } catch (err) {
    res.status(500).json(err);
  }
}