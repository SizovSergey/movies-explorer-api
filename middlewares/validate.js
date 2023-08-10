const { celebrate, Joi } = require('celebrate');

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex(),
  }),
});

const userValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(10),
  }),
});

const loginValidate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(10),
  }),
});

const userUpdateValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const movieValidate = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    director: Joi.string().required(),
    country: Joi.string().required(),
    year: Joi.string().required().max(4),
    duration: Joi.number().required(),
    movieId: Joi.number().required(),
    description: Joi.string().required(),
    trailerLink: Joi.string().required().uri(),
    image: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
  }),
});

module.exports = {
  userValidate,
  loginValidate,
  userUpdateValidate,
  validateId,
  movieValidate,
};
