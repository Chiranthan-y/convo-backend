const express = require('express');
const {
  isSignedIn,
  isAuthenticated,
} = require('../Controllers/Authentication');
const {
  getUserById,
  getUser,
  updateUser,
  deleteUser,
} = require('../Controllers/User');

const router = express.Router();

router.param('userId', getUserById);

router
  .get('/user/:userId', isSignedIn, isAuthenticated, getUser)
  .put('/user/:userId', isSignedIn, isAuthenticated, updateUser)
  .delete('/user/:userId', isSignedIn, isAuthenticated, deleteUser);

module.exports = router;
