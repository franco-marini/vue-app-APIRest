const express = require('express');
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
router.delete('/:id', remove);
router.get('/profile/:userId', getProfile);

module.exports = router;