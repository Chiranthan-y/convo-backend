const User = require('../Models/User');
const Message = require('./../Models/Message');

exports.newMessage = (req, res) => {
  const message = new Message(req.body);

  message.save((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }

    User.findOneAndUpdate(
      { _id: data.sender },
      { $addToSet: { messages: data._id } },
      { new: true },
      (error, data) => {
        if (error || !data) {
          return res.status(400).json({ error });
        }
      }
    );

    User.findOneAndUpdate(
      { _id: data.reciver },
      { $addToSet: { messages: data._id } },
      { new: true },
      (error, data) => {
        if (error || !data) {
          return res.status(400).json({ error });
        }
      }
    );

    return res.status(200).json({ data });
  });
};

exports.syncAllMessage = (req, res) => {
  Message.find()
    .where('_id')
    .in(req.profile.messages)
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({ error });
      }
      return res.status(200).json({ data });
    });
};

exports.syncMessage = (req, res) => {
  console.log('Profile id', req.profile._id);
  console.log('Friend ID', req.body.friendId);
  Message.find()
    .and([
      { sender: req.profile._id || req.body.friendId },
      { reciver: req.profile._id || req.body.friendId },
    ])
    .exec((error, data) => {
      if (error || !data) {
        return res.status(400).json({ error });
      }

      return res.status(200).json({ data });
    });
};
