const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');

module.exports = {
	getUserCartItems: (userid) => {
	  	return Cart.find({
		    where: {
		        UserId: userid,
		  	},
		})
		.then((cart) => {
	        if (!cart) {
	            return false;
	        } else{
	        	console.log(cart)
	        	return CartItem.find({
				    where: {
				        CartId: cart.id,
				  	},
				})
				.then((cartItems) => {
			        if (!cart) {
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
