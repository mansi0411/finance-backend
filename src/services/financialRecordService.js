const FinancialRecord = require('../models/FinancialRecord');
const { parsePagination } = require('../utils/pagination');

class RecordError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
  }
}

function buildListFilter(query) {
  const filter = { isDeleted: false };

  if (query.startDate || query.endDate) {
    filter.date = {};
    if (query.startDate) {
      filter.date.$gte = new Date(query.startDate);
    }
    if (query.endDate) {
      filter.date.$lte = new Date(query.endDate);
    }
  }

  if (query.category) {
    filter.category = query.category;
  }

  if (query.type) {
    filter.type = query.type;
  }

  return filter;
}

async function createRecord(data, createdById) {
  return FinancialRecord.create({
    amount: data.amount,
    type: data.type,
    category: data.category,
    date: new Date(data.date),
    notes: data.notes ?? '',
    createdBy: createdById,
  });
}

async function listRecords(query) {
  const { page, limit, skip } = parsePagination(query.page, query.limit);
  const filter = buildListFilter(query);

  const [items, total] = await Promise.all([
    FinancialRecord.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email role'),
    FinancialRecord.countDocuments(filter),
  ]);

  return {
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 0,
    },
  };
}

async function getRecordById(id) {
  const record = await FinancialRecord.findOne({
    _id: id,
    isDeleted: false,
  }).populate('createdBy', 'name email role');

  if (!record) {
    throw new RecordError('Financial record not found', 404);
  }
  return record;
}

async function updateRecord(id, payload) {
  const record = await FinancialRecord.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!record) {
    throw new RecordError('Financial record not found', 404);
  }

  const allowed = ['amount', 'type', 'category', 'date', 'notes'];
  for (const key of allowed) {
    if (payload[key] !== undefined) {
      if (key === 'date') {
        record[key] = new Date(payload[key]);
      } else {
        record[key] = payload[key];
      }
    }
  }

  await record.save();
  return record.populate('createdBy', 'name email role');
}

async function softDeleteRecord(id) {
  const record = await FinancialRecord.findOne({
    _id: id,
    isDeleted: false,
  });

  if (!record) {
    throw new RecordError('Financial record not found', 404);
  }

  record.isDeleted = true;
  record.deletedAt = new Date();
  await record.save();
  return { id: record._id, deleted: true };
}

module.exports = {
  createRecord,
  listRecords,
  getRecordById,
  updateRecord,
  softDeleteRecord,
  RecordError,
};
