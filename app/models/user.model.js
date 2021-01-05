const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: { type: String, unique: true, required: true},
    hash: { type: String, required: true },
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    imageUrl: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
    // deviceId: String
});

UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      delete ret._id;
      delete ret.hash;
  }
});

module.exports = mongoose.model('User', UserSchema);

