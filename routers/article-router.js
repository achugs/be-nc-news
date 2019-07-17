const articleRouter = require('express').Router();
const { sendArticle, sendArticlePatch } = require('../controllers/articles-controller');
const { sendArticleComments } = require('../controllers/comments-controller');

articleRouter.route('/:article_id').get(sendArticle).patch(sendArticlePatch);

articleRouter
  .route('/:article_id/comments')
  .post(sendArticleComments);
module.exports = articleRouter;