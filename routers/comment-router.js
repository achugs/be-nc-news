const commentRouter = require('express').Router();
const { sendCommentbyId } = require('../controllers/comments-controller');

commentRouter.route('/:comment_id').patch(sendCommentbyId)

module.exports = commentRouter;