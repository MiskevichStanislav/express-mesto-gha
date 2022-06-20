const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/mestodb')

const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '',
  };

  next();
});

app.use('/users', usersRoute);
app.use('/cards', cardsRoute);

app.use((_req, res) => {
 res.status(404).send({ message: 'Упс!...Не найдено' });
});

app.listen(PORT);