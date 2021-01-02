const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    userId: String,
    firstName: String,
    lastName: String,
    imageUrl: String,
    deviceId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

