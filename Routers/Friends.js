const express = require('express');
const {
  isSignedIn,
  isAuthenticated,
  isFriend,
} = require('../Controllers/Authentication');
const { addFriend, removeFriend } = require('../Controllers/Friends');
const { getUserById } = require('../Controllers/User');
const router = express.Router();

router.param('userId', getUserById);

router.post(
  '/user/:userId/friends/add',
  isSignedIn,
  isAuthenticated,
  addFriend
);

router.delete(
  '/user/:userId/friends/remove',
  isSignedIn,
  isAuthenticated,
  isFriend,
  removeFriend
);

module.exports = router;
