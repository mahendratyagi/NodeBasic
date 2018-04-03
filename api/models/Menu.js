const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const Venue = require('./Venue');
const tableName = 'menus';

const Menu = sequelize.define('Menu', {
  menuType: {
    type: Sequelize.STRING,
  },
  menuSort: {
    type: Sequelize.STRING,
    defaultValue: 'ASC'
  },
}, { tableName });

Menu.belongsTo(Venue); 
Venue.hasMany(Menu);

module.exports = Menu;
