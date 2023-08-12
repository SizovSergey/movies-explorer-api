const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

const { userUpdateValidate } = require('../middlewares/validate');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, userUpdateValidate, updateUser);

module.exports = router;
