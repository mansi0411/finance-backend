const Record = require('../models/Record');

async function createRecord(req, res, next) {
  try {
    const { amount, type, category, notes } = req.body;

    const record = await Record.create({
      amount,
      type,
      category,
      notes: notes || '',
      user: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: 'Record created successfully',
      data: record,
    });
  } catch (err) {
    return next(err);
  }
}

async function getUserRecords(req, res, next) {
  try {
    const records = await Record.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createRecord,
  getUserRecords,
};
