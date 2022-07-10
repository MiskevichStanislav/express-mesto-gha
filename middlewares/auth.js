const jwt = require('jsonwebtoken');
const AuthorisationErr = require('../errors/AuthorisationErr_401');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw (new AuthorisationErr('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new AuthorisationErr('Необходима авторизация'));
  }
  req.user = payload;
  next();
};
