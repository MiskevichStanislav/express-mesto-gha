const jwt = require('jsonwebtoken');
const AuthorisationErr = require('../errors/AuthorisationErr_401');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthorisationErr('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new AuthorisationErr('Необходима авторизация');
  }

  req.user = payload;

  return next();
};
