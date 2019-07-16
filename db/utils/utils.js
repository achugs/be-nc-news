exports.formatDates = list => {
  return list.map(date => {
    const { created_at, ...rest } = date;
    const obj = { ...rest };
    obj.created_at = new Date(created_at)
    return obj
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
