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
      if (!comment.length) return Promise.reject({ status: 404, msg: 'comment not found' })
      return comment[0];
    })
}

exports.deletedComment = ({ comment_id }) => {
  return connection('comments')
    .where('comment_id', comment_id)
    .del()
    .from('comments')
    .then(numberOFDel => {
      if (numberOFDel !== 1) return Promise.reject({ status: 404, msg: 'comment not found' });
      if (!numberOFDel) return Promise.reject({ status: 404, msg: 'comment not found' });
    })
}