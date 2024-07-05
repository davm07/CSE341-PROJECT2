/* eslint-disable no-unused-vars */
const passport = require('passport');
const router = require('express').Router();

router.use('/movies', require('./movies'));
router.use('/books', require('./books'));
router.use('/api-docs', require('./swagger'));
router.get('/login', passport.authenticate('github'), (req, res) => {});
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
