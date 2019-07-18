const connection = require('../db/connection');

exports.postArticleComments = (comments) => {
  return connection
    .into('comments')
    .insert(comments)
    .returning('*')
    .then((comment) => comment[0]);
};

exports.getCommentsById = ({ article_id }, { sort_by, order }) => {
  return connection
    .select('comment_id', 'votes', 'created_at', 'author', 'body')
    .from('comments')
    .where('comments.article_id', article_id)
    .orderBy(sort_by || 'created_at', order || 'desc')
    .returning('*')
}