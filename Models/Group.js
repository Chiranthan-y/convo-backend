const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const { messageSchema } = require('./ExtraSchema');

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: ObjectId,
    ref: 'User',
  },
  photo: {
    type: Buffer,
    contentType: String,
  },
  members: [{ type: ObjectId, ref: 'User' }],
  Messages: [messageSchema],
});

module.exports = mongoose.model('Group', groupSchema);
