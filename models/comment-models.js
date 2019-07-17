const connection = require('../db/connection');

exports.postArticleComments = (comments) => {
  return connection
    .into('comments')
    .insert(comments)
    .returning('*')
    .then((comment) => comment[0]);
};
