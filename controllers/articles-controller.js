const { getArticleById, getArticlePatch, getArticles, checkQuery } = require('../models/article-model');


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
  const { sort_by, order, author, topic } = req.query;

  const sortedByOrder = ['asc', 'desc'].includes(order)
  const sortby = ['author', 'title', 'article_id', 'topic', 'created_at', 'votes'].includes(sort_by)
  if (order && !sortedByOrder) { next({ msg: 'page not found', status: 400 }) };
  if (sort_by && !sortby) { next({ msg: 'page not found', status: 400 }) }
  else {
    getArticles(req.params, req.query)
      .then((articles) => {

        const auth = author !== undefined ? checkQuery(author, 'users', 'username') : null;
        const top = topic !== undefined ? checkQuery(topic, 'articles', 'topic') : null;

        return Promise.all([auth, top, articles])
          .then(([auth, top, articles]) => {
            if (auth === false) return Promise.reject({ msg: 'page not found', status: 404 });
            else if (top === false) return Promise.reject({ msg: 'page not found', status: 404 });
            else return res.status(200).send({ articles })
          })
      }).catch(next)
  }




}