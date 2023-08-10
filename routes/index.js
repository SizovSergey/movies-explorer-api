const express = require('express');

const router = express.Router();

const { requestLogger, errorLogger } = require('../middlewares/logger');

const NotFoundError = require('../errors/notFoundError');

const loginRouter = require('./signIn');
const registerRouter = require('./signUp');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use(requestLogger);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/signin', loginRouter);
router.use('/signup', registerRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use(() => {
  throw new NotFoundError('неверный эндпойнт');
});

router.use(errorLogger);

module.exports = router;
