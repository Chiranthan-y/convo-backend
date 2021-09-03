const User = require('../Models/User');
const Message = require('./../Models/Message');

exports.newMessage = (req, res) => {
  const message = new Message({
    text: req.body.text,
    sender: req.params.userId,
    conversationId: req.params.conversationId,
  });
  message.save((err, mes) => {
    if (err || !mes) {
      return res.status(400).json({ error: "Can't create message" });
    }

    return res.status(200).json(mes);
  });
};

exports.syncMessage = (req, res) => {
  Message.find(
    { conversationId: req.params.conversationId },
    (err, messages) => {
      if (err || !messages) {
        return res.status(400).json({
          error: "can't get message",
          err,
        });
      }
      return res.status(200).json(messages);
    }
  );
};
