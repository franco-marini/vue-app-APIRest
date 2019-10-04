const express = require('express');
const rCategory = require('./category');
const rPublication = require('./publication');
const rUser = require('./user');

const router = express.Router();

router.use('/categories', rCategory);
router.use('/publications', rPublication);
router.use('/users', rUser);

module.exports = router;