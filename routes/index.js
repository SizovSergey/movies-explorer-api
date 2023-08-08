const express = require('express');

const router = express.Router();

const NotFoundError = require('../errors/notFoundError');

const usersRouter = require('./users');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/users', usersRouter);
router.use(() => {
  throw new NotFoundError('неверный эндпойнт');
});

module.exports = router;
