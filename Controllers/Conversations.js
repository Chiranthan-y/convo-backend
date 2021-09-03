const Conversation = require('./../Models/Conversation');

exports.getConversationById = (req, res, next, id) => {
  Conversation.findById(id).exec((err, conversation) => {
    if (err || !conversation) {
      return res.status(400).json({
        error: 'Conversation not found',
      });
    }
    next();
  });
};

exports.getConversation = (req, res) => {
  Conversation.findById(req.parmas.conversationId).exec((err, conversation) => {
    if (err || !conversation) {
      return res.status(400).json({
        error: 'Conversation not found',
      });
    }
    if (conversation) {
      res.status(200).json(conversation);
    }
  });
};

exports.getConversationByUser = (req, res) => {
  Conversation.find(
    { users: { $in: [req.params.conversation] } },
    (err, convo) => {
      if (err || !convo) {
        return res.status(200).json({
          error: err,
        });
      }
      return res.status(200).json(convo);
    }
  );
};

exports.createConversation = (req, res) => {
  if (req.params.userId === req.body.friendId) {
    res.status(400).json({
      error: "Can't create",
    });
  }
  const convo = new Conversation({
    users: [req.params.userId, req.body.friendId],
  });
  convo.save((err, convo) => {
    if (err) {
      res.status(400).json({
        error: 'Error in creating conversation',
        error,
      });
    }
    return res.status(200).json(convo);
  });
};
