const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const postsRouter = require("./posts.routes");
const usersRouter = require("./users.routes");
router.use(express.json());
router.use(cookieParser());
router.use("/", [postsRouter, usersRouter]);
module.exports = router;
