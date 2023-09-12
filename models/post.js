'use strict'
const { Model, DataTypes} = require('sequelize');
const sequelize = require('./index');

class Post extends Model {}

Post.init( {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER
  },
  imageUrl: {
    type: DataTypes.STRING
  },
  isVisible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }

}, {
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'post'
}
);

module.exports = Post;