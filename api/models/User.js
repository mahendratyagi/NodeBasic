const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');

const sequelize = require('../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice.password(user); // eslint-disable-line no-param-reassign
  },
  beforeUpdate(user) {
    user.password = bcryptSevice.password(user); // eslint-disable-line no-param-reassign
  },
};

const instanceMethods = {
  toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  userAccountType: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  image: { 
    type: Sequelize.STRING,
  },
}, { hooks, instanceMethods, tableName });

module.exports = User;
