const express = require('express');
const {
  isSignedIn,
  isAuthenticated,
  isFriend,
} = require('../Controllers/Authentication');
const {
  addFriend,
  removeFriend,
  acceptRequest,
} = require('../Controllers/Friends');
const { getUserById } = require('../Controllers/User');
const router = express.Router();

router.param('userId', getUserById);

router
  .post('/user/:userId/friends/add', isSignedIn, isAuthenticated, addFriend)
  .put(
    '/user/:userId/friends/:friendsId/accept',
    isSignedIn,
    isAuthenticated,
    acceptRequest
  );

router.delete(
  '/user/:userId/friends/remove',
  isSignedIn,
  isAuthenticated,
  isFriend,
  removeFriend
);

module.exports = router;
