const mongoose = require("mongoose");
const User = require("../models/user");
const validator = require("validator");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require("../utils/errors");

// Get all users
const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );

// Get a user by ID
const getUser = (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid user ID." });
  }

  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "User not found." });
      }
      return res.send(user);
    })
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  if (!name || !avatar) {
    return res.status(BAD_REQUEST).send({ message: "Invalid user data." });
  }

  if (name.length < 2 || name.length > 30) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Name must be between 2 and 30 characters." });
  }

  if (!validator.isURL(avatar)) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "You must enter a valid URL." });
  }

  return User.create({ name, avatar })
    .then((user) => res.send(user))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
