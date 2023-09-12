const { Model, DataTypes } = require('sequelize');
const sequelize = require('./index');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8]
    }
  },

},
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
      },
      beforeUpdate: async (userData) => {
        if (userData.changed('password')) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }
      }

    },
    sequelize,
    timestamps:false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  });

module.exports = User;