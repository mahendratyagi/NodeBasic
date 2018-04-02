const Sequelize = require('sequelize');
const bcryptSevice = require('../services/bcrypt.service');

const sequelize = require('../../config/database');
const User = require('./User');
/*const hooks = {
  beforeCreate(user) {
    console.log('hooks');
    user.password = bcryptSevice.password(user); // eslint-disable-line no-param-reassign
  },
};*/

/*const instanceMethods = {
  toJSON() {
    console.log('instance');
    const values = Object.assign({}, this.get());

    delete values.password;

    return values;
  },
};
*/
const tableName = 'orders';

const Order = sequelize.define('Order', {
  orderDate: {
    type: Sequelize.DATEONLY,
    defaultValue: Sequelize.NOW
  },
  orderTime: {
    type: Sequelize.TIME,
    defaultValue: Sequelize.NOW
  },
  userID: {
    type: Sequelize.INTEGER,
    unique: true,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
}, { /*instanceMethods,*/ tableName });

User.hasMany(Order);

module.exports = Order;
