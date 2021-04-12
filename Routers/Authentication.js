const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
  signout,
  signUp,
  signIn,
  isSignedIn,
} = require('./../Controllers/Authentication');

router.post('/signup', signUp);

router.post('/signin', signIn);

router.get('/signout', isSignedIn, signout);

module.exports = router;
