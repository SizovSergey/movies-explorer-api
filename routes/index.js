const express = require('express');

const router = express.Router();

const { requestLogger, errorLogger } = require('../middlewares/logger');

const auth = require('../middlewares/auth');

const apiLimiter = require('../utils/limiter');

const NotFoundError = require('../errors/notFoundError');

const loginRouter = require('./signIn');
const registerRouter = require('./signUp');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.use(requestLogger);

router.use(apiLimiter);

router.use('/signin', loginRouter);
router.use('/signup', registerRouter);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use(auth, () => {
  throw new NotFoundError('неверный эндпойнт');
});

router.use(errorLogger);

module.exports = router;
