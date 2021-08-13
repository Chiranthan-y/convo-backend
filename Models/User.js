const mongoose = require('mongoose');
const crypto = require('crypto');

const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      requried: true,
      maxlength: 32,
      trim: true,
    },

    lastname: {
      type: String,
      maxlength: 32,
      trim: true,
    },

    username: {
      type: String,
      maxlength: 20,
      required: true,
      lowercase: true,
      unique: true,
    },
    dateofbirth: {
      type: Date,
    },

    bio: {
      type: String,
      maxlength: 100,
    },

    profilepic: {
      type: Buffer,
      contentType: String,
    },

    phonenumber: {
      type: String,
      minlength: 10,
      trim: true,
      required: true,
      unique: true,
    },

    encry_password: {
      type: String,
      required: true,
    },

    salt: String,

    friendlist: [{ type: Object, ref: 'User' }],

    grouplist: [{ type: Object, ref: 'Group' }],

    messages: [{ type: Object, res: 'Message' }],
  },
  {
    timestamps: true,
  }
);

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainPassword) {
    if (!plainPassword) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt)
        .update(plainPassword)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },
};

module.exports = mongoose.model('User', userSchema);
