const Order = require('../models/Order');

const OrderController = () => {
  const insertOrder = (req, res) => {
    console.log('inside order');
    const body = req.body;

    if (body.userID) {
      return Order
        .create({
          orderDate: body.orderDate,
          orderTime: body.orderTime,
          userID: body.userID,
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
