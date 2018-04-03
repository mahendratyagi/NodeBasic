const multer = require('multer');
const User = require('../models/User');
const Order = require('../models/Order');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
let filepath;
const Storage = multer.diskStorage({
  destination: 'public/Images',
  filename: function(req, file, callback) {
    //console.log('filename ',file)
    filepath = 'public/Images/'+file.fieldname + "_" + Date.now() + "_" + file.originalname;
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const imageUpload = multer({storage: Storage}).single("img"); //Field name and max count

const UserController = () => {
  const register = (req, res) => {
    console.log(req);
    console.log('body');
    console.log(req.body);
    const body = req.body;

    if (body.password === body.password2) {
      console.log('true cond');
      return User
        .create({
          firstName: body.firstname,
          lastName: body.lastname,
          email: body.email,
          password: body.password,
        })
        .then((user) => {
          console.log('after create');
          const token = authService.issue({ id: user.id });

          return res.status(200).json({ token, user });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        });
    }

    return res.status(400).json({ msg: 'Passwords don\'t match' });
  };

  const upload = (req, res) => {
    const body = req.body;
    // console.log(req.body);
    imageUpload(req, res, function(err) {
      if (err) {
        return res.end("Something went wrong!");
      }else{
        User.find({ where: { id: 10 } })
        .then((user) => {
          if (user) {
            user.updateAttributes({
              image: filepath
            })
            .then((result) => {
              console.log(result)
              return res.end("Image Path Updated Sucessfully!.");
            })
          } else{
            return res.end("User Not found");
          }
        })
      }
    });
  };

  const testpage = (req, res) => {
    res.send('App is running!');
  };

  const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (email && password) {
      User
        .findOne({
          where: {
            email,
          },
        })
        .then((user) => {
          if (!user) {
            return res.status(400).json({ msg: 'Bad Request: User not found' });
          }

          if (bcryptService.comparePassword(password, user.password)) {
            const token = authService.issue({ id: user.id });

            return res.status(200).json({ token, user });
          }

          return res.status(401).json({ msg: 'Unauthorized' });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        });
    }
  };

  const validate = (req, res) => {
    const tokenToVerify = req.body.token;

    authService
      .verify(tokenToVerify, (err) => {
        if (err) {
          return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
        }

        return res.status(200).json({ isvalid: true });
      });
  };

  const getAll = (req, res) => {
    User
      .findAll()
      .then((users) => res.status(200).json({ users }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  const getUserOrders = (req, res) => {
    User.findAll({      
      include: [{
        model: Order,
      }]
    })
    .then((details) => res.status(200).json({ details }))
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    });
  };

  return {
    register,
    testpage,
    login,
    validate,
    getAll,
    upload,
    getUserOrders,
  };
};

module.exports = UserController;
