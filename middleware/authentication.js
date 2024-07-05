const createError = require('http-errors');

const isAuthenticated = (req, res, next) => {
  if (req.session.user === undefined) {
    throw createError(401, 'You do not have access to this resource');
  }
  next();
};

module.exports = {
  isAuthenticated
};
