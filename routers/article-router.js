const articleRouter = require('express').Router();
const { sendArticle, sendArticlePatch } = require('../controllers/articles-controller');


articleRouter.route('/:article_id').get(sendArticle).patch(sendArticlePatch);

module.exports = articleRouter;