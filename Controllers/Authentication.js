const User = require('./../Models/User');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signUp = (req, res) => {
  const user = new User(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
  user.save((error, data) => {
    if (error) {
      return res.status(402).json({
        error,
      });
    }

    res.status(200).json({
      data,
    });
  });
};

exports.signIn = (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  User.findOne({ email }, (err, urs) => {
    if (err || !urs) {
      return res.status(402).json({
        error: 'USER dose not exsist',
      });
    }
    if (!urs.autheticate(password)) {
      return res.status(401).json({
        error: 'email and password not matched',
      });
    }
    //create token
    const token = jwt.sign({ id: urs._id }, process.env.SECRET, {
      algorithm: 'HS256',
    });
    //put token in cookie
    res.cookie('token', token, { expire: new Date() + 9999 });
    //send responce

    const { _id, firstname, email, role } = urs;
    return res.json({
      token,
      user: {
        _id,
        firstname,
        email,
        role,
      },
    });
  });
};

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

exports.isAuthenticated = (req, res, next) => {
  let flag = req.auth && req.profile && req.profile._id == req.auth.id;

  console.log(flag);
  console.log('\n auth:', req.auth);
  console.log('\n profile', req.profile);

  if (!flag) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
      flag,
      auth: req.auth,
      profile: req.profile,
    });
  }
  next();
};

exports.isFriends = (req, res, next) => {
  //
};
