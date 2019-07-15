exports.formatDates = list => {
  return list.map(date => {
    date.created_at = new Date(date.created_at)
    return date
  })
};

exports.makeRefObj = list => {
  if (!list.length) return [];
  const obj = {};
  list.forEach(id => (obj[id.title] = id.article_id))
  return obj;
};

exports.formatComments = (comments, articleRef) => {
  return [];
};
