const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const bodyParser = require('body-parser');

const users = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', users);



app.listen(3000, () => {
  console.log('Hura!');
});