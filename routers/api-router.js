const apiRouter = require('express').Router();
const { sendTopics } = require('../controllers/topics-controller');
const usersRouter = require('./username-router')


apiRouter.get('/topics', sendTopics);
apiRouter.use('/users', usersRouter);
apiRouter.use((err, req, res, next) => {
  res.status(404).send({ msg: 'user not found' })
});


module.exports = apiRouter;