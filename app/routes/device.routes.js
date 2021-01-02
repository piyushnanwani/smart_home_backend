module.exports = (app) => {
  const devices = require('../controllers/device.controller.js');

  // Create a new Device
  app.post('/devices', devices.create);

  // Retrieve all devices
  app.get('/devices', devices.findAll);

  // Retrieve a single Device with deviceId
  // app.get('/devices/:deviceId', devices.findOne);
  
  // Retrieve a single Device with userId -> This will help in teling if device is registered or not
  app.get('/devices/:userId', devices.findOneUserId);
  
  // Update a device with deviceId
  app.put('/devices/:deviceId', devices.update);

  // Delete a Ddevice with deviceId
  app.delete('/devices/:deviceId', devices.delete);
}