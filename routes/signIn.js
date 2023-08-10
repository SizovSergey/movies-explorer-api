const express = require('express');

const router = express.Router();

const { loginValidate } = require('../middlewares/validate');

const { login } = require('../controllers/users');

router.post('/', loginValidate, login);

module.exports = router;
