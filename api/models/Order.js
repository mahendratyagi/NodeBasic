const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');

const sequelize = require('../../config/database');
const User = require('./User');

const tableName = 'orders';

const Order = sequelize.define('Order', {
  orderDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  orderTime: {
    type: Sequelize.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
}, { /*instanceMethods,*/ tableName });

Order.belongsTo(User); 
User.hasMany(Order);

module.exports = Order;
