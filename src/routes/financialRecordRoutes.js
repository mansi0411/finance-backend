const express = require('express');
const financialRecordController = require('../controllers/financialRecordController');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');
const { validate } = require('../middleware/validation');
const {
  createFinancialRecordValidators,
  updateFinancialRecordValidators,
  idParamValidator,
  listFinancialRecordValidators,
} = require('../validators/financialRecordValidators');

const router = express.Router();

router.use(authenticateUser);

router.get(
  '/',
  authorizeRoles('Analyst', 'Admin'),
  listFinancialRecordValidators,
  validate,
  financialRecordController.list
);

router.get(
  '/:id',
  authorizeRoles('Analyst', 'Admin'),
  idParamValidator,
  validate,
  financialRecordController.getById
);

router.post(
  '/',
  authorizeRoles('Admin'),
  createFinancialRecordValidators,
  validate,
  financialRecordController.create
);

router.patch(
  '/:id',
  authorizeRoles('Admin'),
  updateFinancialRecordValidators,
  validate,
  financialRecordController.update
);

router.delete(
  '/:id',
  authorizeRoles('Admin'),
  idParamValidator,
  validate,
  financialRecordController.remove
);

module.exports = router;
