/**
 * @param {string|number} page
 * @param {string|number} limit
 * @param {number} maxLimit
 */
function parsePagination(page, limit, maxLimit = 100) {
  const p = Math.max(1, parseInt(String(page), 10) || 1);
  let l = parseInt(String(limit), 10) || 10;
  if (l < 1) l = 10;
  if (l > maxLimit) l = maxLimit;
  const skip = (p - 1) * l;
  return { page: p, limit: l, skip };
}

module.exports = { parsePagination };
