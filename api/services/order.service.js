const Order = require('../models/Order');
const cartService = require('./cart.service.js');

module.exports = {
	getOrderItems: (userid) => {
	  	return cartService.getUserCartItems(userid);
	}  	
};
