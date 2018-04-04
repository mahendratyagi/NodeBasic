const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const orderService = require('../services/order.service');

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
    const body = req.body;
    if (req.token.id) {
      return orderService.getOrderItems(req.token.id)
      .then((cartItems) => {
        if (!cartItems) {
            return false;
        } else{
          return res.status(200).json({ cartItems });
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
      /*return OrderItem
        .create({
          orderDate: body.orderDate,
          orderTime: body.orderTime,
          OrderId: req.params.orderId,
        })
        .then((order) => {
          return res.status(200).json({ order });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Could Not Create Order' });
        });*/
    }

    return res.status(400).json({ msg: 'Invalid Order' });
  };

  return {
    insertOrder,
    dispatchCartItems,
  };


};


module.exports = OrderController;
