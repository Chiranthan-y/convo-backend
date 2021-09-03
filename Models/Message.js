const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

messageSchema = new mongoose.Schema(
  {
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
    conversationId: {
      type: ObjectId,
      ref: 'Conversation',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
