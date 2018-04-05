const multer = require('multer');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

let filepath;
const Storage = multer.diskStorage({
  destination: 'public/Images',
  filename: function(req, file, callback) {
    filepath = 'public/Images/'+file.fieldname + "_" + Date.now() + "_" + file.originalname;
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

const imageUpload = multer({storage: Storage}).single("img"); //Field name and max count

const UserController = () => {
  //POST localhost:9000/public/register
  const register = (req, res) => {
    const body = req.body;

    if (body.password === body.password2) {
      return User
        .create({
          firstName: body.firstname,
          lastName: body.lastname,
          email: body.email,
          userAccountType: 'Customer',
          password: body.password,
        })
        .then((user) => {
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
    //PUT localhost:9000/private/user/image
    const body = req.body;
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
              return res.end("Image Path Updated Sucessfully!.");
            })
          } else{
            return res.end("User Not found");
          }
        })
      }
    });
  };

  const insertCart = (req, res) => {
    //POST localhost:9000/private/cart
    const body = req.body;

    if (req.token.id) {
      return Cart
      .create({
        cartDate: body.cartDate,
        cartTime: body.cartTime,
        UserId: req.token.id
      })
      .then((cart) => {
        return res.status(200).json({ cart });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
    }
  };

  const insertCartItems = (req, res) => {
    //POST localhost:9000/private/cart/:cartId/cartItem
    const body = req.body;

    if (req.token.id) {
      return CartItem
      .create({
        cartDate: body.cartDate,
        cartTime: body.cartTime,
        MenuItemId: body.MenuItemId,
        CartId: req.params.cartId
      })
      .then((cartItem) => {
        return res.status(200).json({ cartItem });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
    }
  };

  const testpage = (req, res) => {
    //POST localhost:9000/public/testpage
    res.send('App is running!');
  };

  const login = (req, res) => {
    //POST localhost:9000/public/login
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
    //POST localhost:9000/public/validate
    const tokenToVerify = req.body.token;

    authService
      .verify(tokenToVerify, (err) => {
        if (err) {
          return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
        }

        return res.status(200).json({ isvalid: true });
      });
  };

  //GET localhost:9000/private/users
  const getAll = (req, res) => {
    User
      .findAll()
      .then((users) => res.status(200).json({ users }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
  };

  //POST localhost:9000/private/userOrders
  const getUserOrders = (req, res) => {
    if(req.token.id) {
      User.findAll({      
        include: [{
          model: Order,
        }],
        where: {
          id: req.token.id
        },
      })
      .then((details) => res.status(200).json({ details }))
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      });
    } else{
      return res.status(200).json({ msg: 'No User' });
    }    
  };

  return {
    register,
    testpage,
    login,
    validate,
    getAll,
    upload,
    getUserOrders,
    insertCart,
    insertCartItems
  };
};

module.exports = UserController;
