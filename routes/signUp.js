const express = require('express');

const router = express.Router();

const { userValidate } = require('../middlewares/validate');

const { createUser } = require('../controllers/users');

router.post('/', userValidate, createUser);

module.exports = router;
