const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const PostsController = require("../controllers/posts.controller");
const postsController = new PostsController();

router.get("/posts", postsController.getPosts);
router.post("/posts", authMiddleware, postsController.createPost);
router.get("/posts/:postId", postsController.getPostDetails);

module.exports = router;
