
const usersRouter = require('express').Router();
const { sendUsername } = require('../controllers/users-controller');

usersRouter.route('/:username').get(sendUsername);

module.exports = usersRouter;