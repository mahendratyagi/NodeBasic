const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
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
	},

	cancelOrder: (orderid,res) => {
	  	return OrderItem.update({
		  	orderStatus: 'Cancel',
		}, {
		  	where: {
		    	OrderId: orderid
		  	},
		})
	  	.then((updatedItems) => {
	        if (!updatedItems) {
	            return res.status(400).json({ msg: 'No Items Found' });
	        } else{
	        	return res.status(200).json({ updatedItems });
	        }
        })
        .catch((err) => {
		    console.log(err);
		    return res.status(400).json({ msg: 'Error In Updation' });
        });
	},

	deleteOrder: (orderid,res) => {
	  	return OrderItem.destroy({
		  	where: {
		    	OrderId: orderid
		  	},
		})
	  	.then((deletedItems) => {
	        if (!deletedItems) {
	            return res.status(400).json({ msg: 'No Items Found' });
	        } else{
	        	return Order.destroy({
				  	where: {
				    	id: orderid
				  	},
				})
				.then((deletedOrder) => {
			        if (!deletedOrder) {
			            return res.status(400).json({ msg: 'No Order Found' });
			        } else{
			        	return res.status(200).json({ deletedOrder });
			        }
		        })
		        .catch((err) => {
				    console.log(err);
				    return res.status(400).json({ msg: 'Error In Deletion' });
		        });
	        }
        })
        .catch((err) => {
		    console.log(err);
		    return res.status(400).json({ msg: 'Error In Deletion' });
        });
	},	
};
