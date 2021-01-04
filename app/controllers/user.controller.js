const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
   // Validate request
   if(!req.body) {
     console.log(req);
    return res.status(400).send({
        message: "User content can not be empty"
    });
}

// Create a User
const user = new User({
  email: req.body.email,
  userId: req.body.userId,
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  imageUrl: req.body.imageUrl,
  deviceId: req.body.deviceId,
});

// Save User in the database
user.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
    });
});
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
  User.find()
  .then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
      });
  });
};

// // Find a single user with a Id (column of MongoDB)
// exports.findOne = (req, res) => {
//   User.findById(req.params.userId)
//   .then(user => {
//       if(!user) {
//           return res.status(404).send({
//               message: "User not found with id " + req.params.userId
//           });            
//       }
//       res.send(user);
//   }).catch(err => {
//       if(err.kind === 'ObjectId') {
//           return res.status(404).send({
//               message: "User not found with id " + req.params.userId
//           });                
//       }
//       return res.status(500).send({
//           message: "Error retrieving user with id " + req.params.userId
//       });
//   });
// };

// Find user with given  userId 
exports.findUserWithUserId = (req, res) => {
  User.findOne({userId: req.params.userId})
  // User.findById(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with userId " + req.params.userId
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with userId " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving user with userId " + req.params.userId
      });
  });
};

// Incorrect , since we to update with userId and not Id

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
      return res.status(400).send({
          message: "User content can not be empty"
      });
  }

  // Find User and update it with the request body
  User.findOneAndUpdate({userId: req.params.userId}, {
    email: req.body.email,
    // userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    imageUrl: req.body.imageUrl,
    deviceId: req.body.deviceId,
  }, {new: true})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error updating user with id " + req.params.userId
      });
  });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findOneAndRemove({userId: req.params.userId})
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });
      }
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "User not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Could not delete user with id " + req.params.userId
      });
  });
};