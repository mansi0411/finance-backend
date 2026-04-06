const User = require('../models/User');
const { signToken } = require('../utils/jwt');

class AuthError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

async function register({ name, email, password }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AuthError('Email already registered', 409);
  }

  const user = await User.create({
    name,
    email,
    password,
    role: 'Viewer',
  });

  const token = signToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new AuthError('Invalid email or password', 401);
  }
  if (user.status !== 'active') {
    throw new AuthError('Account is inactive', 403);
  }

  const match = await user.comparePassword(password);
  if (!match) {
    throw new AuthError('Invalid email or password', 401);
  }

  const token = signToken(user._id);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  };
}

module.exports = { register, login, AuthError };
