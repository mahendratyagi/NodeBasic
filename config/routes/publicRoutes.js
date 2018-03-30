module.exports = {
  'GET /testpage': 'UserController.testpage',
  'POST /user': 'UserController.register',
  'POST /upload': 'UserController.upload',
  'POST /register': 'UserController.register', // alias for POST /user
  'POST /login': 'UserController.login',
  'POST /validate': 'UserController.validate',
};
