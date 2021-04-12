const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const { messageSchema } = require('./MessageSchema');

exports.friendsSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    ref: 'User',
    requried: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  messages: [messageSchema],
});
