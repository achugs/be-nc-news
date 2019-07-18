const { getArticleById, getArticlePatch, getArticles } = require('../models/article-model');


exports.sendArticleById = (req, res, next) => {
  const { article_id } = req.params;
  getArticleById(article_id).then(article => {
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
    res.status(201).send({ comments })
  }).catch(next)
}

exports.sendArticles = (req, res, next) => {
  getArticles(req.query).then((article) => {

    res.status(200).send({ article })
  }).catch(next)
}