const User = require('./../Models/User');

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User not found ',
      });
    }
    req.profile = user;

    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, usr) => {
      if (err) {
        return res.status(400).json({
          error: 'your not authorized to edit the user',
        });
      }

      return res.json({
        role: usr.role,
        purchases: usr.purchases,
        _id: usr._id,
        name: usr.name,
        lastname: usr.lastname,
        email: usr.email,
        __v: usr.__v,
      });
    }
  );
};

exports.deleteUser = (req, res) => {
  //
};
