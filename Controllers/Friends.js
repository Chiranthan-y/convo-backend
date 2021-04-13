const User = require('./../Models/User');

exports.addFriend = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { friendlist: req.body } },
    (error, data) => {
      if (error) {
        res.status(400).json({
          error,
        });

        res.status(200).json(data);
      }
    }
  );
};
