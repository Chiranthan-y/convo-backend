const express = require('express');
const router = express.Router();
const { getGroupId } = require('./../Controllers/Group');
const {
  isAuthenticated,
  isSignedIn,
} = require('./../Controllers/Authentication');
const { getUserById } = require('./../Controllers/User');

router.param('groupId', getGroupId);
router.param('userId', getUserById);

router.post(
  '/user/:userId/group/new',
  isSignedIn,
  isAuthenticated,
  createGroup
);
router.get(
  '/user/:userId/group/group/:groupId',
  isSignedIn,
  isAuthenticated,
  getGroup
);
router.delete();

module.exports = router;
