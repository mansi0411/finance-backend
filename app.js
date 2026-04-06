const express = require('express');
const cors = require('cors');
const apiRoutes = require('./src/routes');
const { requestLogger } = require('./src/middleware/logger');
const { notFoundHandler, errorHandler } = require('./src/middleware/errorHandler');
const { AuthError } = require('./src/services/authService');
const { RecordError } = require('./src/services/financialRecordService');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'ok' });
});

app.use(requestLogger);

app.use('/api', apiRoutes);

app.use(notFoundHandler);

app.use((err, req, res, next) => {
  if (err instanceof AuthError || err instanceof RecordError) {
    err.statusCode = err.statusCode || 400;
  } else if (err.name === 'ValidationError') {
    err.statusCode = 400;
  } else if (err.code === 11000) {
    err.statusCode = 409;
    err.message = 'Duplicate value (e.g. email already exists)';
  }
  errorHandler(err, req, res, next);
});

module.exports = app;
