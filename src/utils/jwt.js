const jwt = require('jsonwebtoken');

function signToken(userId) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is required');
  }
  return jwt.sign({ userId: String(userId) }, secret, { expiresIn: '7d' });
}

module.exports = { signToken };
