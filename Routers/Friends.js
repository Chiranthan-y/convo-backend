const express = require('express');
const {
  isSignedIn,
  isAuthenticated,
} = require('../Controllers/Authentication');
const { addFriend } = require('../Controllers/Friends');
const { getUserById } = require('../Controllers/User');
const router = express.Router();

router.param('userId', getUserById);

router.post(
  '/user/:userId/friends/add',
  isSignedIn,
  isAuthenticated,
  addFriend
);

module.exports = router;
