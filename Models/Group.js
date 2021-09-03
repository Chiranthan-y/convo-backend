const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: ObjectId,
    ref: 'User',
  },
  grouppic: {
    type: Buffer,
    contentType: String,
  },
  members: [{ type: ObjectId, ref: 'User' }],
  messages: [{ type: ObjectId, ref: 'Message' }],
});

module.exports = mongoose.model('Group', groupSchema);
