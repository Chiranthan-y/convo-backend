const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const FriendSchema = new mongoose.Schema({
  requester: { type: ObjectId, ref: 'User' },
  recipient: { type: ObjectId, ref: 'User' },
  convesationId: { type: ObjectId, ref: 'Conversation' },
  status: {
    type: Number,
    enums: [
      0, //'add friend',
      1, //'requested',
      2, //'friends'
    ],
  },
});

module.exports = mongoose.model('Friends', FriendSchema);
