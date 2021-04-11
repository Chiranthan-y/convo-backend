const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { signUp, signIn } = require('./../Controllers/Authentication');

router.post(
  '/signup',
  [
    check(
      'firstname',
      'Your name is too short, please check your FirstName'
    ).isLength({
      min: 3,
    }),
    check(
      'email',
      'email adress is invalid, please check your email address'
    ).isEmail(),
    check(
      'phonenumber',
      'invalid PhoneNumber, please check your phonenumber'
    ).isMobilePhone(),
    check('password', 'Password is to short').isLength({ min: 3 }),
  ],
  signUp
);

router.post(
  '/signin',
  [
    check(
      'email',
      'email adress is invalid, please check your email address'
    ).isEmail(),
    check('password', 'Password is to short').isLength({ min: 3 }),
  ],
  signIn
);

module.exports = router;
