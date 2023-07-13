const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users.contoroller");
const usersController = new UsersController();

router.post("/users", usersController.createUser);
router.get("/users", usersController.getUser);

module.exports = router;
