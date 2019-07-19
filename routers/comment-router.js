const commentRouter = require('express').Router();
const { sendCommentbyId, deleteComment } = require('../controllers/comments-controller');

commentRouter.route('/:comment_id')
  .patch(sendCommentbyId)
  .delete(deleteComment)

module.exports = commentRouter;