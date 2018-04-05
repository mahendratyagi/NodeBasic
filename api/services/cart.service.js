const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');
const CartItem = require('../models/CartItem');

module.exports = {
	getUserCartItems: (userid) => {
	  	return Cart.find({
		    where: {
		        UserId: userid,
		  	},
		  	raw: true,
		})
		.then((cart) => {
	        if (!cart) {
	            return false;
	        } else{
	        	return CartItem.findAll({
				    where: {
				        CartId: cart.id,
				  	},
				  	include: [{
				  		attributes: ['menuItemPrice'],
			          	model: MenuItem,
			        }],
				  	raw: true,
				})
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
        })
        .catch((err) => {
		    console.log(err);
		    return false;
        });
	}  	
};
