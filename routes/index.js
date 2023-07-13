const express = require("express");
const router = express.Router();

const postsRouter = require("./posts.routes");
const usersRouter = require("./users.routes");
router.use("/", [postsRouter, usersRouter]);
module.exports = router;
