const Venue = require('../models/Venue');
const User = require('../models/User');
const adminService = require('../services/admin.service');

const AdminController = () => {
  const insertVenue = (req, res) => {
    const body = req.body;

    if (req.token.id) {
      console.log(req.token.id);
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

  return {
    insertVenue,
  };
};

module.exports = AdminController;
