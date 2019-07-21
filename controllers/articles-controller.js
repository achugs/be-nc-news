const { getArticleById, getArticlePatch, getArticles } = require('../models/article-model');


exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id).then(article => {
    res.status(200).send({ article });
  }).catch(next);
};

exports.sendArticlePatch = (req, res, next) => {
  const { inc_votes } = req.body;
  if (inc_votes === undefined) return next({ status: 400, msg: 'No Body Found...' });
  else {
    getArticlePatch(req.params, req.body).then(article => {
      res.status(200).send({ article });
    }).catch(next);
  }
}

exports.sendArticles = (req, res, next) => {
  getArticles(req.query)
    .then((articles) => {
      res.status(200).send({ articles })
    }).catch(next)
}