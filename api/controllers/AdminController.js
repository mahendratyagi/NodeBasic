const Venue = require('../models/Venue');
const User = require('../models/User');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const adminService = require('../services/admin.service');
const async = require("async");

const AdminController = () => {
  //POST localhost:9000/private/venue
  const insertVenue = (req, res) => {
    const body = req.body;

    if (req.token.id) {
      adminService.getUserType(req.token.id)
      .then((isAdmin) => {
        if(isAdmin){
          return Venue
          .create({
            venueName: body.venueName,
            venueAddress: body.venueAddress,
            venueCity: body.venueCity,
            venueState: body.venueState,
            venueZip: body.venueZip,
          })
          .then((venue) => {
            return res.status(200).json({ venue });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
          });
        }else{
          return res.status(200).json({ 'isAdmin' : false });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(200).json({ 'msg' : 'Error' });
      });
    }
  };

  //POST localhost:9000/private/menu
  const insertMenu = (req, res) => {
    const body = req.body;

    if (req.token.id) {
      adminService.getUserType(req.token.id)
      .then((isAdmin) => {
        if(isAdmin){
          return Menu
          .create({
            menuType: body.menuType,
            menuSort: body.menuSort,
            VenueId: body.VenueId,
          })
          .then((menu) => {
            return res.status(200).json({ menu });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
          });
        }else{
          return res.status(200).json({ 'isAdmin' : false });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(200).json({ 'msg' : 'Error' });
      });
    }
  };

  //POST localhost:9000/private/menu/:menuId/menuItem
  const insertMenuItem = (req, res) => {
    const body = req.body;
    if (req.token.id) {
      adminService.getUserType(req.token.id)
      .then((isAdmin) => {
        if(isAdmin){
          return MenuItem
          .create({
            menuItemName: body.menuItemName,
            menuItemPrice: body.menuItemPrice,
            MenuId: req.params.menuId,
          })
          .then((menuItem) => {
            return res.status(200).json({ menuItem });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
          });
        }else{
          return res.status(200).json({ 'isAdmin' : false });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(200).json({ 'msg' : 'Error' });
      });
    }
  };

  //POST localhost:9000/private/user/orders
  const getAllUserOrders = (req, res) => {
    if (req.token.id) {
      userOrders = [];
      adminService.getUserType(req.token.id)
      .then((isAdmin) => {
        if(isAdmin){
          return User.findAll({
            raw: true,
          })
          .then((users) => {
            if (!users) {
              return false;
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
        } else{
          return res.status(200).json({ 'isAdmin' : false });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(200).json({ 'msg' : 'Error' });
      });
    }
  };

  return {
    insertVenue,
    insertMenu,
    insertMenuItem,
    getAllUserOrders,
  };
};

module.exports = AdminController;
