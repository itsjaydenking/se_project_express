import mongoose from "mongoose";
import User from "../models/user.js";
import { InternalServerErrorMessage } from "../utils/errors.js";

export const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};

export const getUser = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid user ID." });
  }

  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      return res.send(user);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};

export const createUser = (req, res) => {
  if (!req.body.name || !req.body.avatar) {
    return res.status(400).send({ message: "Invalid user data." });
  } else {
    User.create({
      name: req.body.name,
      avatar: req.body.avatar,
    })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({ message: InternalServerErrorMessage });
      });
  }
};
