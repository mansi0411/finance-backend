const financialRecordService = require('../services/financialRecordService');

async function create(req, res, next) {
  try {
    const record = await financialRecordService.createRecord(req.body, req.user._id);
    const populated = await record.populate('createdBy', 'name email role');
    res.status(201).json({ success: true, data: populated });
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const result = await financialRecordService.listRecords(req.query);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const record = await financialRecordService.getRecordById(req.params.id);
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  try {
    const { amount, type, category, date, notes } = req.body;
    const record = await financialRecordService.updateRecord(req.params.id, {
      amount,
      type,
      category,
      date,
      notes,
    });
    res.json({ success: true, data: record });
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const result = await financialRecordService.softDeleteRecord(req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById, update, remove };
