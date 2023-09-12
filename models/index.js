'use strict'
const { Sequelize } = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
console.log(config);

const { User } = require('./user');
const { Post } = require('./post');
const { Comment } = require('./comment');


let sequelize;


if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      ...config,
      define: {}  // Explicitly providing an empty definition configuration
    }
  );
}


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


module.exports = { sequelize, Post, Comment, User };
