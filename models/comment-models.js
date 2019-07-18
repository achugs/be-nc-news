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

exports.patchComments = ({ comment_id }, { inc_votes }) => {
  return connection('comments')
    .where({ comment_id })
    .increment('votes', inc_votes || 0)
    .returning('*')
    .then(comment => {
      console.log(comment)
      if (!comment.length) return Promise.reject({ status: 404, message: 'comment not found' })
      return comment[0];
    })
}