const articleRouter = require('express').Router();
const { sendArticleById, sendArticlePatch, sendArticles } = require('../controllers/articles-controller');
const { sendArticleComments, sendComment } = require('../controllers/comments-controller');

articleRouter.route('/').get(sendArticles)
articleRouter.route('/:article_id').get(sendArticleById).patch(sendArticlePatch);

articleRouter
  .route('/:article_id/comments')
  .post(sendArticleComments).get(sendComment)
module.exports = articleRouter;