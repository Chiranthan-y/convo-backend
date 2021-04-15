const express = require('express');
const { getUserById } = require('../Controllers/User');
const {
  isSignedIn,
  isAuthenticated,
  isFriend,
} = require('./../Controllers/Authentication');
const { newMessage, syncMessage } = require('./../Controllers/Message');
const router = express.Router();

router.param('userId', getUserById);
router.post(
  '/user/:userId/message/new',
  isSignedIn,
  isAuthenticated,
  isFriend,
  newMessage
);

//!-------------------- should code for reciving the message ------------------------->

router.get(
  '/user/:userId/friend/:userId/message/sync',
  isSignedIn,
  isAuthenticated,
  isFriend,
  syncMessage
);

module.exports = router;
