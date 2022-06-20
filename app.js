const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb')
  .catch((err) => {
    console.log(err);
  });

const { PORT = 3000 } = process.env;

app.listen(3000, () => {
  console.log('Hura!');
});