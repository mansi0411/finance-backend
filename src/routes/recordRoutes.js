const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const { createRecord, getUserRecords } = require('../controllers/recordController');

const router = express.Router();

router.use(authenticateUser);

router.post('/', createRecord);
router.get('/', getUserRecords);

module.exports = router;
