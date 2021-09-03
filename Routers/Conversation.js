const express = require('express');
const { getUserById } = require('../Controllers/User');
const {
  isSignedIn,
  isAuthenticated,
} = require('../Controllers/Authentication');

const {
  createConversation,
  getConversation,
  getConversationById,
} = require('./../Controllers/Conversations');
const router = express.Router();

router
  .param('conversationId', getConversationById)
  .param('userId', getUserById)
  .get(
    '/user/:userId/conversation/:conversationId',
    isSignedIn,
    isAuthenticated,
    getConversation
  )
  .post(
    '/user/:userId/conversation/',
    isSignedIn,
    isAuthenticated,
    createConversation
  );

module.exports = router;
