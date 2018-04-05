const Sequelize = require('sequelize');

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
}, { tableName });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;
