const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const conversationSchema = new mongoose.Schema(
  {
    users: [{ type: ObjectId, ref: 'User', requried: true, unique: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Conversation', conversationSchema);
