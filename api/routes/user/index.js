const express = require('express');
const controller = require('../../controllers/user');

const router = express.Router();
const {
  login,
  signUp,
  remove,
} = controller;

router.post('/login', login);
router.post('/signup', signUp);
router.delete('/:id', remove);

module.exports = router;