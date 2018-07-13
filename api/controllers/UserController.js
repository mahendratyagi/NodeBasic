const multer = require('multer');
const User = require('../models/User');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');
const validationHelper = require('../helpers/validationHelper');
const _ = require('lodash');

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
    let validationMsg = validationHelper.checkNotEmptyFields({
      firstName: body.firstname,
      lastName: body.lastname,
      email: body.email,
      password: body.password,
    });
    if(validationMsg.length){
      return res.status(400).json({ validationError: validationMsg });
    } else{ 
      let i = 0;
      let isInvalid = 0;     
      if(!validationHelper.validName(body.firstname)){
        validationMsg[i] = 'First Name Can Only Contain Characters';
        i++;
        isInvalid = 1;
      } 
      if(!validationHelper.validName(body.lastname)){
        validationMsg[i] = 'Last Name Can Only Contain Characters';
        i++;
        isInvalid = 1;
      } 
      if(!validationHelper.validEmail(body.email)){
        validationMsg[i] = 'Invalid Email Address';
        i++;
        isInvalid = 1;
      } 
      /*if(!validationHelper.validPassword(body.password)){
        validationMsg[i] = 'Password Should Contain Atleast 8 Characters';
        i++;
        isInvalid = 1;
      }*/
      if(isInvalid == 1){
        return res.status(400).json({ validationError: validationMsg });
      }
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
      } else{
        return res.status(400).json({ msg: 'Passwords don\'t match' });
      }    
    } 
  };

  //PUT localhost:9000/private/user/image
  const upload = (req, res) => {
    const body = req.body;
    if(req.token.id) {
      imageUpload(req, res, function(err) {
        if (err) {
          return res.end("Something went wrong!");
        }else{
          User.find({ where: { id: req.token.id } })
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
    } else{
      return res.end("User Not found");
    }   
  };

  //PUT localhost:9000/private/user
  const updateUser = (req, res) => {
    const body = req.body;
    if (req.token.id) {
      return User
      .findOne({
        where: {
          id: req.token.id
        },
      })
      .then((User) => {
        const body = req.body;
        let validationMsg = validationHelper.checkNotEmptyFields({
          firstName: body.firstname,
          lastName: body.lastname,
          // email: body.email,
          password: body.password,
        });
        if(validationMsg.length){
          return res.status(400).json({ validationError: validationMsg });
        } else{ 
          return User.update({
            firstName: body.firstname,
            lastName: body.lastname,
            // email: body.email,
            password: body.password,
          })
          .then((updatedUser) => {
            return res.status(200).json({ updatedUser });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Could Not Update User' });
          });
        }        
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ msg: 'Could Not Update User' });
      });
    } else{
      return res.status(400).json({ msg: 'No User' });
    }
  };

  //POST localhost:9000/private/cart
  const insertCart = (req, res) => {
    const body = req.body;

    if (req.token.id) {
      let validationMsg = validationHelper.checkNotEmptyFields({
          cartTime: body.cartTime,
          cartDate: body.cartDate
        });
        if(validationMsg.length){
          return res.status(400).json({ validationError: validationMsg });
        } else{
          return Cart.create({
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
    }
  };

  const insertCartItems = (req, res) => {
    //POST localhost:9000/private/cart/:cartId/cartItem
    const body = req.body;

    if (req.token.id) {
      let validationMsg = validationHelper.checkNotEmptyFields({
          cartTime: body.cartTime,
          cartDate: body.cartDate,
          MenuItemId: body.MenuItemId
        });
        if(validationMsg.length){
          return res.status(400).json({ validationError: validationMsg });
        } else{
          return CartItem
          .create({
            cartDate: body.cartDate,
            cartTime: body.cartTime,
            MenuItemId: body.MenuItemId,
            CartId: body.cartId
          })
          .then((cartItem) => {
            return res.status(200).json({ cartItem });
          })
          .catch((err) => {
            console.log(err);
            return res.status(500).json({ msg: 'Internal server error' });
          });
        }
    }else {
      return res.status(500).json({ msg: 'cartId, MenuItemId is required' });
    }
  };

  //POST localhost:9000/public/testpage
  const testpage = (req, res) => {    
    res.send('App is running!');
  };   

  //POST localhost:9000/public/login
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

  //POST localhost:9000/public/validate
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
    insertCartItems,
    updateUser,
  };
};

module.exports = UserController;
