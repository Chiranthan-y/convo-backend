const User = require('./../Models/User');

exports.addFriend = (req, res) => {
  const id = req.profile._id;
  const friendId = req.body.friendId;

  User.findOneAndUpdate(
    { _id: id },
    { $addToSet: { friendlist: friendId } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({ error });
      }

      return res.status(200).json({
        data,
      });
    }
  );
};

exports.removeFriend = (req, res) => {
  const id = req.profile._id;
  const friendId = req.body.friendId;

  User.findByIdAndUpdate(
    { _id: id },
    { $pull: { friendlist: friendId } },
    { new: true },
    (error, data) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.status(200).json({ data });
    }
  );
};
