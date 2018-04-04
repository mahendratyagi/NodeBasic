const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const Menu = require('./Menu');
const tableName = 'menuItems';

const MenuItem = sequelize.define('MenuItem', {
  menuItemName: {
    type: Sequelize.STRING,
    unique: true
  },
  menuItemPrice: {
    type: Sequelize.FLOAT,
    defaultValue: 0.00
  },
}, { tableName });

MenuItem.belongsTo(Menu); 
Menu.hasMany(MenuItem);

module.exports = MenuItem;
