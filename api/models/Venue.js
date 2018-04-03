const Sequelize = require('sequelize');

const sequelize = require('../../config/database');

const tableName = 'venues';

const Venue = sequelize.define('Venue', {
  venueName: {
    type: Sequelize.STRING,
  },
  venueAddress: {
    type: Sequelize.STRING,
  },
  venueCity: {
    type: Sequelize.STRING,
  },
  venueState: {
    type: Sequelize.STRING,
  },
  venueZip: {
    type: Sequelize.INTEGER,
  },
}, { /*instanceMethods,*/ tableName });

/*Order.belongsTo(User); 
User.hasMany(Order);*/

module.exports = Venue;
