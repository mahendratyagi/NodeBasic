const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const MenuItem = require('./MenuItem');
const Cart = require('./Cart');
const tableName = 'cartItems';

const CartItem = sequelize.define('CartItem', {
  menuItemName: {
    type: Sequelize.STRING,
    unique: true
  },
  menuItemPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  },
}, { tableName });

CartItem.belongsTo(MenuItem); 
CartItem.belongsTo(Cart); 

module.exports = CartItem;
