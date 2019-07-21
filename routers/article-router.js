const articleRouter = require('express').Router();
const { sendArticleById, sendArticlePatch, sendArticles } = require('../controllers/articles-controller');
const { sendPostedArticleComments, sendComment } = require('../controllers/comments-controller');
const { methodErrors } = require('../errors/errors')

articleRouter.route('/')
  .get(sendArticles)
  .all(methodErrors);


articleRouter.route('/:article_id')
  .get(sendArticleById)
  .patch(sendArticlePatch)
  .all(methodErrors);

articleRouter
  .route('/:article_id/comments')
  .post(sendPostedArticleComments)
  .get(sendComment)
  .all(methodErrors);

module.exports = articleRouter;