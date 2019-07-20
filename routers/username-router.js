
const usersRouter = require('express').Router();
const { sendUsername } = require('../controllers/users-controller');
const { methodErrors } = require('../errors/errors')

usersRouter.route('/:username')
  .get(sendUsername)
  .all(methodErrors)


module.exports = usersRouter;