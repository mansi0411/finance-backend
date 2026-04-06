const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['Viewer', 'Analyst', 'Admin'];
const STATUSES = ['active', 'inactive'];

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'Viewer',
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'active',
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.statics.ROLES = ROLES;
userSchema.statics.STATUSES = STATUSES;

module.exports = mongoose.model('User', userSchema);
