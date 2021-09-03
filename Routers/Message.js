const express = require('express');
const { getConversationById } = require('../Controllers/Conversations');
const { getUserById } = require('../Controllers/User');
const {
  isSignedIn,
  isAuthenticated,
  isFriend,
} = require('./../Controllers/Authentication');
const { newMessage, syncMessage } = require('./../Controllers/Message');
const router = express.Router();

router
  .param('userId', getUserById)
  .param('conversationId', getConversationById)
  .post(
    '/user/:userId/message/:conversationId',
    isSignedIn,
    isAuthenticated,
    newMessage
  );

//!-------------------- should code for reciving the message ------------------------->

router.get(
  '/user/:userId/message/:conversationId',
  isSignedIn,
  isAuthenticated,
  isFriend,
  syncMessage
);

module.exports = router;
