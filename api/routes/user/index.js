const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const controller = require('../../controllers/user');

const router = express.Router();
const {
  login,
  signUp,
  remove,
  getProfile,
} = controller;

router.post('/login', login);
router.post('/signup', signUp);
router.delete('/:id', checkAuth, remove);
router.get('/profile/:userId', checkAuth, getProfile);

module.exports = router;