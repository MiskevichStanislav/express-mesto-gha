const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
    default: 'Jak iv Kusto',
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    // required: true,
    default: 'Treval',
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: 'https://images.unsplash.com/photo-1464820453369-31d2c0b651af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (mail) => validator.isEmail(mail),
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

module.exports = mongoose.model('user', userSchema);
