const express = require("express");

const UserController = require("../controllers/user");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

router.get("", UserController.getUsers);

router.get("/:id", UserController.getUser);

router.get("/name/:id", UserController.getUserName);

module.exports = router;
