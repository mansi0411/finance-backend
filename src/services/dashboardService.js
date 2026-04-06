const FinancialRecord = require('../models/FinancialRecord');

async function getSummary() {
  const match = { isDeleted: false };

  const [totalsAgg, categoryAgg, lastFive] = await Promise.all([
    FinancialRecord.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' },
        },
      },
    ]),
    FinancialRecord.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          income: {
            $sum: {
              $cond: [{ $eq: ['$type', 'income'] }, '$amount', 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$type', 'expense'] }, '$amount', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          income: 1,
          expense: 1,
          net: { $subtract: ['$income', '$expense'] },
        },
      },
      { $sort: { category: 1 } },
    ]),
    FinancialRecord.find(match)
      .sort({ date: -1, createdAt: -1 })
      .limit(5)
      .populate('createdBy', 'name email role')
      .lean(),
  ]);

  let totalIncome = 0;
  let totalExpense = 0;
  for (const row of totalsAgg) {
    if (row._id === 'income') totalIncome = row.total;
    if (row._id === 'expense') totalExpense = row.total;
  }

  const netBalance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    netBalance,
    categoryTotals: categoryAgg,
    lastTransactions: lastFive,
  };
}

module.exports = { getSummary };
