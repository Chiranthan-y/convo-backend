const User = require('./../Models/User');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const fs = require('fs');
const validator = require('validator');

exports.signUp = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.status(400).json({
        error,
      });
    }

    const {
      firstname,
      lastname,
      username,
      password,
      email,
      phonenumber,
      bio,
    } = fields;

    if (
      !firstname ||
      !lastname ||
      !username ||
      !password ||
      !email ||
      !phonenumber ||
      !bio
    ) {
      res.status(400).json({
        error: 'Fill all the fields',
      });
    }

    if (!validator.isEmail(email)) {
      res.status(400).json({
        error: 'Invalid email address',
      });
    }

    if (!validator.isMobilePhone(phonenumber, 'en-IN')) {
      res.status(400).json({
        error: 'invalid phonenumber',
      });
    }

    user = new User(fields);

    if (files.photo) {
      if (files.photo.size > 5242880) {
        res.status(400).json({
          error: 'file is too large',
        });
      }
      user.photo = fs.readFileSync(files.photo.path);
      user.photo.contentType = files.photo.type;
    }

    user.save((error, user) => {
      if (error) {
        return res.status(400).json({
          error: 'user has not saved in the db',
          error,
        });
      }
      return res.json(user);
    });
  });
};

exports.signIn = (req, res) => {
  const form = formidable({ multiples: true });

  form.parse(req, (error, fields, files) => {
    if (error) {
      res.status(400).json({
        error: 'error in form',
      });
    }

    const { email, password } = fields;

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
  });
};

exports.signout = (req, res) => {
  res.json({
    message: 'user signout',
  });
};

///! MIDDLEWARE

exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
  algorithms: ['HS256'],
});

exports.isAuthenticated = (req, res, next) => {
  let flag = req.auth && req.profile && req.profile._id == req.auth.id;

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
