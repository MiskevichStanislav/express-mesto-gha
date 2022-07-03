const Card = require('../models/card');
const ValidErr = require('../errors/ValidationErr_400');
const ForbiddenErr = require('../errors/ForbiddenErr_403');
const NotFoundErr = require('../errors/NotFoundErr_404');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.send({
      data: cards,
    }))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const {
    name,
    link,
  } = req.body;
  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidErr') {
        return next(new ValidErr('Введены некорректные данные'));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка отсутствует');
      }
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Это чужая карточка, ее нельзя удалить');
      } else {
        return card.remove()
          .then(() => res.send({
            message: 'Карточка удалена',
          }));
      }
    }).catch(next);
};
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка отсутствует');
      }
      return res.send({ data: card });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Карточка отсутствует');
      }
      return res.send({ data: card });
    })
    .catch(next);
};
