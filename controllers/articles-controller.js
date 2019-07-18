const { getArticle, getArticlePatch } = require('../models/article-model');


exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  getArticle(article_id).then(article => {
    res.status(200).send({ article });
  }).catch(next);
};

exports.sendArticlePatch = (req, res, next) => {
  getArticlePatch(req.params, req.body).then(article => {
    res.status(200).send({ article });
  }).catch(next);
}

exports.sendPostedArticleComments = (req, res, next) => {
  getPostedArticleComments(req.params).then((comments) => {
    res.status(200).send({ comments })
  }).catch(next)
}