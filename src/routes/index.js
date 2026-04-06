const express = require('express');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'OK' });
});

router.use('/auth', require('./authRoutes'));
router.use('/dashboard', require('./dashboardRoutes'));
router.use('/financial-records', require('./financialRecordRoutes'));
router.use('/records', require('./recordRoutes'));

module.exports = router;
