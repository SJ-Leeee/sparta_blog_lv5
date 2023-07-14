const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const CommentController = require('../controllers/comments.controller');
const commentController = new CommentController();

router.get('/posts/:postId/comments', commentController.getComment);
router.post(
  '/posts/:postId/comments',
  authMiddleware,
  commentController.createComment
);
router.put(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentController.modifyComment
);
router.delete(
  '/posts/:postId/comments/:commentId',
  authMiddleware,
  commentController.deleteComment
);

module.exports = router;
