const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const orderService = require('../services/order.service');
const async = require("async");


const OrderController = () => {
  const insertOrder = (req, res) => {
    const body = req.body;
    if (req.token.id) {
      return Order
        .create({
          orderDate: body.orderDate,
          orderTime: body.orderTime,
          UserId: req.token.id,
        })
        .then((order) => {
          return res.status(200).json({ order });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Could Not Create Order' });
        });
    }

    return res.status(400).json({ msg: 'Invalid Order' });
  };

  const dispatchCartItems = (req, res) => {
    let orderItems = [];
    const body = req.body;
    if (req.token.id) {
      return orderService.getOrderItems(req.token.id)
      .then((cartItems) => {
        if (!cartItems) {
            return false;
        } else{
          async.each(cartItems,
            function(item, callback){
              OrderItem.create({
                OrderId: req.params.orderId,
                orderStatus: 'Ready To Dispatch',
                MenuItemId: item.MenuItemId,
                price: item['MenuItem.menuItemPrice']
              })
              .then((orderItem) => {
                orderItems.push(orderItem);
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
                return res.status(200).json({ orderItems });
              }
            }
          );
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ msg: 'Invalid OrderId' });
      });
    }else{
      return res.status(400).json({ msg: 'Invalid User' });
    }    
  };

  return {
    insertOrder,
    dispatchCartItems,
  };


};


module.exports = OrderController;
