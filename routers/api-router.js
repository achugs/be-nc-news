const apiRouter = require('express').Router();
const { sendTopics } = require('../controllers/topics-controller');
const usersRouter = require('./username-router');
const articleRouter = require('./article-router');
const commentRouter = require('./comment-router');
const { methodErrors } = require('../errors/errors')
const { getApiJSON } = require('../controllers/endpoints-controller')


apiRouter.route('/').get(getApiJSON).all(methodErrors);
apiRouter.route('/topics')
  .get(sendTopics)
  .all(methodErrors);

apiRouter.use('/users', usersRouter)

apiRouter.use('/articles', articleRouter);

apiRouter.use('/comments', commentRouter);

module.exports = apiRouter;