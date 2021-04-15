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

exports.syncMessage = (req, res) => {
  req;
};
