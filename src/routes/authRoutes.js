const express = require('express');
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validation');
const { registerValidators, loginValidators } = require('../validators/authValidators');

const router = express.Router();

router.post('/register', registerValidators, validate, authController.register);
router.post('/login', loginValidators, validate, authController.login);

module.exports = router;
