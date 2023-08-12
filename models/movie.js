const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)(www\.)?([a-z0-9._]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?#?$/i;

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
    maxlength: 4,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    pattern: {
      params: urlRegex,
      message: 'Неправильная ссылка на постер фильма',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    pattern: {
      params: urlRegex,
      message: 'Неправильная ссылка на трейлер фильма',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    pattern: {
      params: urlRegex,
      message: 'Неправильная ссылка на мини постер фильма',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: Number,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;
