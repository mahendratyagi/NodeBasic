module.exports = {
  'GET /users': 'UserController.getAll',
  'POST /userOrders': 'UserController.getUserOrders',
  'POST /upload': 'UserController.upload',
  'POST /order': 'OrderController.insertOrder',
  'POST /venue': 'AdminController.insertVenue',
  'POST /menu': 'AdminController.insertMenu',
  'POST /menu/:menuId/menuItem': 'AdminController.insertMenuItem',
  'POST /cart': 'UserController.insertCart',  
};
