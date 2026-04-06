const mongoose = require('mongoose');

const financialRecordSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true, min: 0 },
    type: {
      type: String,
      enum: ['income', 'expense'],
      required: true,
    },
    category: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    notes: { type: String, trim: true, default: '' },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

financialRecordSchema.index({ date: -1 });
financialRecordSchema.index({ category: 1, isDeleted: 1 });
financialRecordSchema.index({ type: 1, isDeleted: 1 });

module.exports = mongoose.model('FinancialRecord', financialRecordSchema);
