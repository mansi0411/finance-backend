const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.get(
  '/summary',
  authenticateUser,
  authorizeRoles('Viewer', 'Analyst', 'Admin'),
  dashboardController.summary
);

module.exports = router;
