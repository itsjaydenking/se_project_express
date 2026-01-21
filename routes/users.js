const express = require("express");
const { getUsers, getUser, createUser } = require("../controllers/users");

const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
  getUsers(req, res);
});
userRouter.get("/users/:userId", (req, res) => {
  getUser(req, res);
});
userRouter.post("/users", (req, res) => {
  createUser(req, res);
});

module.exports = userRouter;
