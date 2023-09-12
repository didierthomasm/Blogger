'use strict'
const { User } = require('./user');
const { Post } = require('./post');
const { Comment } = require('./comment');


User.hasMany(Post, {
  foreignKey: 'user_id',
  as: 'post'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  as: 'comments'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  as: 'comments'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  as: 'post'
});


module.exports = { Post, Comment, User };
