const apiRouter = require('express').Router();
const { sendTopics } = require('../controllers/topics-controller');
const usersRouter = require('./username-router');
const articleRouter = require('./article-router');


apiRouter.get('/topics', sendTopics);
apiRouter.use('/users', usersRouter);
apiRouter.use((err, req, res, next) => {
  res.status(404).send({ msg: 'user not found' })
});
apiRouter.use('/article', articleRouter);
apiRouter.use((err, req, res, next) => {
  res.status(400).send({ msg: 'bad request' })
});


module.exports = apiRouter;