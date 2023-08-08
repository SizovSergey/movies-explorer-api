const express = require('express');

const router = express.Router();

const auth = require('../middlewares/auth');

const {
  updateUser, getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', updateUser);

module.exports = router;