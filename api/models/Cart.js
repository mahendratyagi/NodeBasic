const Sequelize = require('sequelize');

const sequelize = require('../../config/database');
const User = require('./User');

const tableName = 'carts';

const Cart = sequelize.define('Cart', {
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
  UserId: {
    type: Sequelize.INTEGER,
    unique: true,
    references: {
      model: User,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
    }
  },
}, { tableName });

Cart.belongsTo(User);

module.exports = Cart;
