const Device = require('../models/device.model.js');

// Create and Save a new Device
exports.create = (req, res) => {
   // Validate request
   if(!req.body) {
     console.log(req);
    return res.status(400).send({
        message: "Device content can not be empty"
    });
}

// Create a Device
const device = new Device({
  deviceId: req.body.deviceId,
  userId: req.body.userId,
  brokerUrl: req.body.brokerUrl,
  brokerUserName: req.body.brokerUserName,
  brokerPassword: req.body.brokerPassword,
  subscribedTopic1: req.body.subscribedTopic1,
  publishedTopic1: req.body.publishedTopic1,
  wifiName: req.body.wifiName,
  wifiPassword: req.body.wifiPassword,
});

// Save Device in the database
device.save()
.then(data => {
    res.send(data);
}).catch(err => {
    res.status(500).send({
        message: err.message || "Some error occurred while creating the Device."
    });
});
};

// Retrieve and return all devices from the database.
exports.findAll = (req, res) => {
  Device.find()
  .then(devices => {
      res.send(devices);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving devices."
      });
  });
};

// Find a single device with a Id
exports.findOne = (req, res) => {
  Device.findById(req.params.deviceId)
  .then(device => {
      if(!device) {
          return res.status(404).send({
              message: "Device not found with id " + req.params.deviceId
          });            
      }
      res.send(device);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Device not found with id " + req.params.deviceId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving device with id " + req.params.deviceId
      });
  });
};
// Find a single device with a userId
exports.findDeviceWithUserId = (req, res) => {
  console.log(req.params);
  Device.findOne({userId: req.params.userId})
  .then(device => {
      if(!device) {
          return res.status(404).send({
              message: "Device not found with userId " + req.params.userId
          });            
      }
      res.send(device);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Device not found with userId " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving device with userId " + req.params.userId
      });
  });
};

// Update a device identified by the deviceId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
      return res.status(400).send({
          message: "Device content can not be empty"
      });
  }

  // Find Device and update it with the request body
  Device.findOneAndUpdate({ userId: req.params.userId }, {
    // userId: req.body.userId,
    brokerUrl: req.body.brokerUrl  ,
    brokerUserName: req.body.brokerUserName,
    brokerPassword: req.body.brokerPassword,
    subscribedTopic1: req.body.subscribedTopic1,
    publishedTopic1: req.body.publishedTopic1,
    wifiName: req.body.wifiName,
    wifiPassword: req.body.wifiPassword
  }, {new: true})
  .then(device => {
      if(!device) {
          return res.status(404).send({
              message: "Device not found with userId " + req.params.userId
          });
      }
      res.send(device);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Device not found with userId " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error updating device with userId " + req.params.userId
      });
  });
};

// Delete a device with the specified userId associated with that device in the request
exports.delete = (req, res) => {
  Device.findOneAndRemove({ userId: req.params.userId })
  .then(device => {
      if(!device) {
          return res.status(404).send({
              message: "Device not found with userId " + req.params.userId
          });
      }
      res.send({message: "Device deleted successfully!"});
  }).catch(err => {
      if(err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
              message: "Device not found with userId " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Could not delete device with userId " + req.params.userId
      });
  });
};