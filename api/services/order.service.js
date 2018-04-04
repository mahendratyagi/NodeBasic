const Order = require('../models/Order');
const cartService = require('./cart.service.js');

module.exports = {
	getOrderItems: (userid) => {
	  	return cartService.getUserCartItems(userid)
	  	.then((cartItems) => {
	        if (!cartItems) {
	            return false;
	        } else{
	        	return cartItems;
	        }
        })
        .catch((err) => {
		    console.log(err);
		    return false;
        });
	}  	
};
