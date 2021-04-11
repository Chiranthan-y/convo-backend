const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

exports.messageSchema = new mongoose.Schema({
  text: {
    type: String,
    requried: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  fromuser: {
    type: ObjectId,
    ref: 'User',
  },
});

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
