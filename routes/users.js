import express from "express";
import { getUsers, getUser, createUser } from "../controllers/users.js";

const userRouter = express.Router();

userRouter.get("/users", (req, res, next) => {
  getUsers(req, res, next);
});
userRouter.get("/users/:id", (req, res, next) => {
  getUser(req, res, next);
});
userRouter.post("/users", (req, res, next) => {
  createUser(req, res, next);
});

export default userRouter;
