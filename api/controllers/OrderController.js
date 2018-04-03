const Order = require('../models/Order');

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

  return {
    insertOrder,
  };
};

module.exports = OrderController;
