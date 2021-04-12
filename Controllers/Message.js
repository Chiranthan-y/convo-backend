const User = require('./../Models/User');

exports.newMessage = (req, res) => {
  const id = req.profile._id;

  User.findOneAndUpdate(
    { _id: id },
    { $push: { messages: req.body } },
    { new: true },
    (error, data) => {
      if (error || !data) {
        return res.status(400).json({
          error,
        });
      }
      res.status(200).json(data);
    }
  );
};

exports.syncMessage = (req, res) => {
  console.log(req.profile);
  User.findById(req.profile._id, (error, data) => {
    if (error || !data) {
      res.status(400).json({
        error: 'Message not found',
      });
    }

    res.status(200).json({});
  });
};
