const { body, param, query } = require('express-validator');

const createFinancialRecordValidators = [
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a non-negative number'),
  body('type')
    .notEmpty()
    .withMessage('Type is required')
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Date must be a valid ISO 8601 date'),
  body('notes').optional().isString().trim(),
];

const updateFinancialRecordValidators = [
  param('id').isMongoId().withMessage('Invalid record id'),
  body('amount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Amount must be a non-negative number'),
  body('type')
    .optional()
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense'),
  body('category').optional().trim().notEmpty().withMessage('Category cannot be empty'),
  body('date').optional().isISO8601().withMessage('Date must be a valid ISO 8601 date'),
  body('notes').optional().isString().trim(),
];

const idParamValidator = [param('id').isMongoId().withMessage('Invalid record id')];

const listFinancialRecordValidators = [
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be 1–100'),
  query('startDate').optional().isISO8601().withMessage('startDate must be ISO 8601'),
  query('endDate').optional().isISO8601().withMessage('endDate must be ISO 8601'),
  query('category').optional().isString().trim(),
  query('type').optional().isIn(['income', 'expense']).withMessage('type must be income or expense'),
];

module.exports = {
  createFinancialRecordValidators,
  updateFinancialRecordValidators,
  idParamValidator,
  listFinancialRecordValidators,
};
