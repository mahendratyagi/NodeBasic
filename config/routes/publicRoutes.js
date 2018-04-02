module.exports = {
  'GET /testpage': 'UserController.testpage',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
};
