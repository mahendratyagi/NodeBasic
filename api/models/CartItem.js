const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const MenuItem = require('./MenuItem');
const Cart = require('./Cart');
const tableName = 'cartItems';

const CartItem = sequelize.define('CartItem', {
  cartDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  cartTime: {
    type: Sequelize.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
}, { tableName });

CartItem.belongsTo(Cart); 
CartItem.belongsTo(MenuItem); 


module.exports = CartItem;
