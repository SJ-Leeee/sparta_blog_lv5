const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/auth.middleware');
const PostsController = require('../controllers/posts.controller');
const postsController = new PostsController();

router.get('/posts', postsController.getPost);
router.post('/posts', authMiddleware, postsController.createPost);
router.get('/posts/:postId', postsController.getPostDetail);
router.put('/posts/:postId', authMiddleware, postsController.modifyPost);
router.delete('/posts/:postId', authMiddleware, postsController.deletePost);
router.post('/posts/:postId/likes', authMiddleware, postsController.likePost);

module.exports = router;
