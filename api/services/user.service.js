const User = require('../models/User');
const OrderItem = require('../models/OrderItem');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const async = require("async");

module.exports = {
	getAllUserOrders: (res) => {
		userOrders = [];
    return User.findAll({
      raw: true,
    })
    .then((users) => {
      if (!users) {
        return res.status(200).json({ msg: 'No Users' });
      } else{
        let i = 0;
        async.each(users,
	        function(user, callback){
	          Order.findAll({
	            where: {
	              UserId: user.id
	            },
	            include: [{
	              attributes: ['orderStatus' , 'MenuItemId'],
	              model: OrderItem,
	              include: [{
	                model: MenuItem,
	              }],
	            }],
	          })
	          .then((orders) => {
	            users[i]['orders'] = orders;
	            i++;
	            userOrders.push(orders);
	            callback();
	          })
	          .catch((err) => {
	            console.log(err);
	            return res.status(500).json({ msg: 'Could Not Create Order' });
	          });
	        },            
	        function(err){
	          if(err) {
	            console.log(err);
	            return res.status(400).json({ msg: 'Could Not Dispatch Orders' });
	          } else{
	            return res.status(200).json({ users });
	          }
	        }
      	);
    	}
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ 'msg' : err });
    });
  }
};
