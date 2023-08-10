const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  getFavoriteMovies, deleteFavoriteMovie, addFavoriteMovie,
} = require('../controllers/movies');

const { validateId, movieValidate } = require('../middlewares/validate');

router.get('/', auth, getFavoriteMovies);
router.post('/', auth, movieValidate, addFavoriteMovie);
router.delete('/:_id', auth, validateId, deleteFavoriteMovie);

module.exports = router;
