const Venue = require('../models/Venue');
const User = require('../models/User');
const Menu = require('../models/Menu');
const MenuItem = require('../models/MenuItem');
const adminService = require('../services/admin.service');

const AdminController = () => {
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
            MenuId: body.MenuId,
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

  return {
    insertVenue,
    insertMenu,
    insertMenuItem,
  };
};

module.exports = AdminController;
