const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  updateUserInfo, getCurrentUser,
} = require('../controllers/users');

const { userUpdateValidate } = require('../middlewares/validate');

router.get('/me', auth, getCurrentUser);
router.patch('/me', auth, userUpdateValidate, updateUserInfo);

module.exports = router;
