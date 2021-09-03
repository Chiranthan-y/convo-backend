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

    const { firstname, lastname, username, password, phonenumber } = fields;

    if (!firstname || !lastname || !username || !password || !phonenumber) {
      res.status(400).json({
        error: 'Fill all the fields',
      });
    }
    if (!validator.isMobilePhone(phonenumber, 'en-IN')) {
      res.status(400).json({
        error: 'invalid phonenumber',
      });
    }

    user = new User(fields);

    if (files.profilepic) {
      if (files.profilepic.size > 5242880) {
        res.status(400).json({
          error: 'file is too large',
        });
      }
      user.profilepic = fs.readFileSync(files.profilepic.path);
      user.profilepic.contentType = files.profilepic.type;
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

    const { username, password } = fields;

    User.findOne({ username }, (err, urs) => {
      if (err || !urs) {
        return res.status(402).json({
          error: 'USER dose not exsist',
        });
      }
      if (!urs.autheticate(password)) {
        return res.status(401).json({
          error: 'username and password not matched',
        });
      }
      //create token
      const token = jwt.sign({ id: urs._id }, process.env.SECRET, {
        algorithm: 'HS256',
      });
      //put token in cookie
      res.cookie('token', token, { expire: new Date() + 9999 });
      //send responce

      const { _id, username, phonenumber } = urs;
      return res.json({
        token,
        user: {
          _id,
          phonenumber,
          username,
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

exports.isFriend = (req, res, next) => {
  id = req.profile._id;
  friendId = req.body.friendId || req.body.reciver;
  User.findById(id, (error, data) => {
    let flag;
    data.friendlist.map((id) => {
      if (id === friendId) {
        flag = true;
      } else {
        flag = false;
      }
    });

    if (error || !data) {
      return res.status(400).json({ error });
    }
    if (flag == false) {
      return res.status(400).json({ error: 'not friends' });
    }
    next();
  });
};

exports.isGroupAdmin = (req, res, next) => {
  //
};

exports.isGroupMember = (req, res, next) => {
  //
};
