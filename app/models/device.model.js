const mongoose = require('mongoose');

const DeviceSchema = mongoose.Schema({
  deviceId: String,
  userId: String,
  brokerUrl: String,
  brokerUserName: String,
  brokerPassword: String,
  subscribedTopic1: String,
  publishedTopic1: String,
  wifiName: String,
  wifiPassword: String,

}, {
    timestamps: true
});

module.exports = mongoose.model('Device', DeviceSchema);

