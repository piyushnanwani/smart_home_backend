module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  const userService = require('../services/user.service.js');
 
  app.post('/users/authenticate', authenticate);
  app.post('/users/register', register);

  // below method and route 'app.post('/users', ... ' is depreciated and replaced by register
  // Create a new User
  app.post('/users', users.create);

  // Retrieve all users
  app.get('/users', users.findAll);

  // Retrieve a single User with userId
  app.get('/users/:userId', users.findUserWithUserId);

  // Update a User with userId
  app.put('/users/:userId', users.update);

  // Delete a User with userId
  app.delete('/users/:userId', users.delete);
  
  function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
  }
  
  function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
  }
}
