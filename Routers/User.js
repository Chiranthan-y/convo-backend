const express = require('express');
const {
  isSignedIn,
  isAuthenticated,
} = require('../Controllers/Authentication');
const { getUserById, getUser } = require('../Controllers/User');

const router = express.Router();

router.param('userId', getUserById);

router.get('/user/:userId', isSignedIn, isAuthenticated, getUser);

module.exports = router;
