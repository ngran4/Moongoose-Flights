const express = require('express');
const router = express.Router();
const destinationsController = require('../controllers/destinations');

/* GET users listing. */
router.post('flights/:id/destinations', destinationsController.create);
// router.get('/:id', destinationsController.show);

module.exports = router;
