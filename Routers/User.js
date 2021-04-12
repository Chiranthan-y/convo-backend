const express = require('express');
const {
  isSignedIn,
  isAuthenticated,
} = require('../Controllers/Authentication');
const { getUserById, getUser, updateUser } = require('../Controllers/User');

const router = express.Router();

router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

router.put('/user/:userId', isSignedIn, isAuthenticated, updateUser);

module.exports = router;
