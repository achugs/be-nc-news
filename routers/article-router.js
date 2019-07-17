const articleRouter = require('express').Router();
const { sendArticle } = require('../controllers/articles-controller');

articleRouter.route('/:article_id').get(sendArticle);

module.exports = articleRouter;