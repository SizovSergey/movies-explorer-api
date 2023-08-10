require('dotenv').config();

const express = require('express');

const app = express();

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const routes = require('./routes/index');

const cors = require('./middlewares/cors');

const errorsHandler = require('./middlewares/errorsHandler');

const { PORT = 3000, DB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json());

app.use(cors);

app.use(helmet());

app.use('/api', apiLimiter);

app.use(routes);

app.use(errors());

app.use(errorsHandler);

app.listen(PORT);
