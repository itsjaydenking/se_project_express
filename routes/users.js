import express from "express";
import { getUsers, getUser, createUser } from "../controllers/users";

const userRouter = express.Router();

userRouter.get("/users", (req, res) => {
  getUsers(req, res);
});
userRouter.get("/users/:id", (req, res) => {
  getUser(req, res);
});
userRouter.post("/users", (req, res) => {
  createUser(req, res);
});

export default userRouter;
