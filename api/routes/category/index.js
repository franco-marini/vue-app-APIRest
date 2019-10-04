const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const controller = require('../../controllers/category');

const router = express.Router();
const {
  getAll,
  getById,
  insert,
  update,
  remove,
} = controller;

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', checkAuth, insert);
router.patch('/:id', checkAuth, update);
router.delete('/:id', checkAuth, remove);

module.exports = router;