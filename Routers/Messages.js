const express = require('express');
const router = express.Router();
const {
  isSignedIn,
  isAuthenticated,
} = require('./../Controllers/Authentication');
const { getUserById } = require('./../Controllers/User');

const { syncMessage, newMessage } = require('../Controllers/Message');

router.param('userId', getUserById);

router.post('/:userId/message/new', isSignedIn, isAuthenticated, newMessage);

router.get('/:userId/messages/sycn', isSignedIn, isAuthenticated, syncMessage);

module.exports = router;
