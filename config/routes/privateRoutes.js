module.exports = {
  'GET /users': 'UserController.getAll',
  'POST /userOrders': 'UserController.getUserOrders',
  'POST /upload': 'UserController.upload',
  'POST /order': 'OrderController.insertOrder',
  'POST /venue': 'AdminController.insertVenue',
};
