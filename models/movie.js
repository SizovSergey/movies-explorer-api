const mongoose = require('mongoose');

const urlRegex = /^(https?:\/\/)(www\.)?([a-z0-9._]+)\.([a-z]{2,6}\.?)(\/[\w.]*)*\/?#?$/i;

const movieSchema = new mongoose.Schema({

  country: {
    type: String,
    maxlength: 30,
    required: true,
  },

  director: {
    type: String,
    maxlength: 30,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: String,
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
      message: 'неправильный url',
    },
  },

  trailerLink: {
    type: String,
    required: true,
    pattern: {
      params: urlRegex,
      message: 'неправильный url',
    },
  },

  thumbnail: {
    type: String,
    required: true,
    pattern: {
      params: urlRegex,
      message: 'неправильный url',
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
