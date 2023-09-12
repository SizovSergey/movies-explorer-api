require('dotenv').config();

const express = require('express');

const app = express();

const helmet = require('helmet');

const mongoose = require('mongoose');

const { errors } = require('celebrate');
const DB = require('./utils/adress');

const routes = require('./routes/index');

const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000 } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(helmet());

app.use(routes);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
