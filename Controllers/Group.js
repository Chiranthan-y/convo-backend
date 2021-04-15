const Group = require('./../Models/Group');

exports.getGroupId = (req, res, next, id) => {
  Group.findById(id).exec((error, data) => {
    if (error || !data) {
      res.status(400).json({
        error: 'group not found!',
      });
    }
    next();
  });
};
