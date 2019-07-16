exports.formatDates = list => {
  return list.map(date => {
    date.created_at = new Date(date.created_at)
    return date
  })
};

exports.makeRefObj = list => {
  const obj = {};
  list.forEach(id => obj[id.title] = id.article_id)
  return obj;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(comment => {
    const { created_by, created_at, belongs_to, ...rest } = comment;
    const obj = { ...rest };
    obj.author = created_by;
    obj.article_id = articleRef[belongs_to];
    obj.created_at = new Date(created_at);
    return obj;
  });
};
