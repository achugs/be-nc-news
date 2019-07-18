const articleRouter = require('express').Router();
const { sendArticle, sendArticlePatch } = require('../controllers/articles-controller');
const { sendArticleComments, sendComment } = require('../controllers/comments-controller');

articleRouter.route('/:article_id').get(sendArticle).patch(sendArticlePatch);

articleRouter
  .route('/:article_id/comments')
  .post(sendArticleComments).get(sendComment)
module.exports = articleRouter;