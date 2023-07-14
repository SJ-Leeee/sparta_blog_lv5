const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const postsRouter = require('./posts.routes');
const usersRouter = require('./users.routes');
const commentsRouter = require('./comments.routes');

router.use(express.json());
router.use(cookieParser());
router.use('/', [postsRouter, usersRouter, commentsRouter]);
module.exports = router;
