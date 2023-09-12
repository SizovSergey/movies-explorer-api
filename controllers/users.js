const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        name: user.name,
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Данные заполнены неверно'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует.'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const id = req.user._id;

  User.findById(id, { _id: 0 })
    .then((user) => {
      if (!user) {
        throw new NotFoundError({ message: 'Нет пользователя с таким id' });
      }
      res.status(200).send(user);
    })
    .catch((err) => next(err));
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  console.log(req.body);
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      console.log(user);
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        throw new BadRequestError(badRequestError.fatal);
      } else if (error.name === "NotFound") {
        throw new NotFoundError(notFoundErr.userId);
      }
    }).catch(next);
};



module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!email || !password) {
        next(new UnauthorizedError('Неверный email или пароль.'));
      }
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'supersecretkey', { expiresIn: '7d' });
      res
        .status(200)
        .send({ token });
    })
    .catch((err) => next(err));
};
