const apiRouter = require('express').Router();
const { sendTopics, sendUsers } = require('../controllers/controller')

apiRouter.get('/topics', sendTopics);
apiRouter.get('/users', sendUsers);

module.exports = apiRouter;