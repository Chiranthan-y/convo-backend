const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

messageSchema = new mongoose.Schema({
  text: {
    type: String,
    requried: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  sender: {
    type: ObjectId,
    ref: 'User',
  },
  reciver: {
    type: ObjectId,
    ref: 'User' || 'Group',
  },
});

module.exports = mongoose.model('Message', messageSchema);
