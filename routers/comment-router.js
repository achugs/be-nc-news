const commentRouter = require('express').Router();
const { sendCommentbyId, deleteComment } = require('../controllers/comments-controller');
const { methodErrors } = require('../errors/errors')

commentRouter.route('/:comment_id')
  .patch(sendCommentbyId)
  .delete(deleteComment).all(methodErrors);

module.exports = commentRouter;