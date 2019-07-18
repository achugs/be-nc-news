const { postArticleComments, getCommentsById, } = require('../models/comment-models');

exports.sendArticleComments = (req, res, next) => {
  const addComment = req.body;
  const { article_id } = req.params;
  const { username, body } = addComment;
  const obj = {};
  obj.author = username;
  obj.body = body;
  obj.article_id = article_id;
  postArticleComments(obj)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.sendComment = (req, res, next) => {
  getCommentsById(req.params, req.query)
    .then(comment => res.status(200)
      .send({ comment }))
    .catch(next)
}