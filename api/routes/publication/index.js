const express = require('express');
const checkAuth = require('../../middleware/check-auth');
const checkUpload = require('../../middleware/check-upload');
const controller = require('../../controllers/publication');

const router = express.Router();
const {
  getAll,
  getById,
  getByCategory,
  insert,
  update,
  remove,
} = controller;

router.get('/', getAll);
router.get('/:id', getById);
router.get('/category/:categoryId', getByCategory);
router.post('/', checkAuth, checkUpload.single('image'), insert);
router.patch('/:id', checkAuth, update);
router.delete('/:id', checkAuth, remove);

module.exports = router;