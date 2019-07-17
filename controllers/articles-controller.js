const { getArticles, getArticlePatch } = require('../models/article-model');


exports.sendArticle = (req, res, next) => {
  const { article_id } = req.params;
  // console.log(req.params, 'params')
  getArticles(article_id).then(article => {
    // console.log(article, 'controller')
    res.status(200).send({ article });
  }).catch(next);
};

exports.sendArticlePatch = (req, res, next) => {
  console.log(req.params, req.body)

  getArticlePatch(req.params, req.body).then(article => {
    res.status(200).send({ article });
  }).catch(next);
}