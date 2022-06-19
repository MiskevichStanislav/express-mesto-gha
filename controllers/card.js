const Card = require('../models/card');

module.exports.getCards = (_req, res) => {
  Card.find({})
  .then((cards) => res.send({ data: cards }))
  .catch(() => res.status(500).send({ message: 'Ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
  .then((card) => res.status(200).send(card))
  .catch((error) => {
    if (error.name === 'ValidationError') {
      res.status(400).send({ message: 'При создании карточки произошла ошибка' });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка' });
  });
};
 

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена' });
        return;
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'Некорректные данные' });
        return;
      }
      res.status(500).send({ message: 'Ошибка' });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (card === null) {
      return res.status(404).send({ message: 'Упс..такого _id карточки нет' });
    }
    return res.send({ data: card });
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: 'Не правильно введены данные' });
    }
    if (err.name === 'CastError') {
      return res.status(400).send({ message: 'Не корректные данные _id карточки' });
    }
    return res.status(500).send({ message: 'Ошибка' });
  });


  module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card === null) {
        return res.status(404).send({ message: 'Не корректные данные _id карточки' });
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: 'Не правильно введены данные' });
      }
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Не корректные данные _id карточки' });
      }
      return res.status(500).send({ message: 'Ошибка по умолчанию.' });
    });