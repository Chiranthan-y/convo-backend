const User = require('./../Models/User');
const Friends = require('./../Models/Friends');

exports.addFriend = (req, res) => {
  const friends = new Friends({
    requester: req.params.userId,
    recipient: req.body.friendId,
    status: 1,
  });

  friends.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }
    User.updateMany(
      { _id: { $in: [req.params.userId, req.body.friendId] } },
      { $push: { friendlist: data._id } },
      (error, data) => {
        if (error) {
          return res.status(400).json(error);
        }
      }
    );
    return res.status(200).json(data);
  });
};

exports.acceptRequest = (req, res) => {
  Friends.findByIdAndUpdate(
    req.params.friendsId,
    { $set: { status: 2 } },
    (error, data) => {
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(200).json(data);
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
