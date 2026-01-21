import mongoose from "mongoose";
import User from "../models/user.js";
import validator from "validator";
import { InternalServerErrorMessage } from "../utils/errors.js";

// Get all users
export const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};

// Get user by ID
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

// Create a new user
export const createUser = (req, res) => {
  if (!req.body.name || !req.body.avatar) {
    return res.status(400).send({ message: "Invalid user data." });
  } else if (2 > req.body.name.length || req.body.name.length > 30) {
    return res
      .status(400)
      .send({ message: "Name must be between 2 and 30 characters." });
  } else if (!validator.isURL(req.body.avatar)) {
    return res.status(400).send({ message: "You must enter a valid URL." });
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
