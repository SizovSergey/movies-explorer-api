const Movie = require('../models/movie');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

module.exports.getFavoriteMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((err) => next(err));
};

module.exports.deleteFavoriteMovie = (req, res, next) => {
  const id = req.params._id;
  const userId = req.user._id;
  Movie.findById(id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('ничего не найдено');
      } else if (movie.owner.toString() !== userId.toString()) {
        throw new ForbiddenError('Нельзя удалять любимые фильмы других пользователей');
      } else {
        Movie.deleteOne(movie)
          .then((deletedCard) => {
            res.send(deletedCard);
          })
          .catch(next);
      }
    })
    .catch((err) => next(err));
};

module.exports.addFavoriteMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image = req.image.url,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Переданы неверные данные.'));
      }
      return next(err);
    });
};
