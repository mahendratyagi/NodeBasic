const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const MenuItem = require('./MenuItem');
const Order = require('./Order');

const tableName = 'orderItems';

const OrderItem = sequelize.define('OrderItem', {
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
  orderStatus: {
    type: Sequelize.STRING,
    defaultValue: 'Dispatched'
  },
  price: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  },
}, { tableName });

OrderItem.belongsTo(MenuItem); 
Order.hasOne(OrderItem);

module.exports = OrderItem;
