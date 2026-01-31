const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require("../utils/errors");

// User login
const login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      return res.status(401).send({ message: "Incorrect email or password" });
    });
};

// Get all users
const getUsers = (req, res) =>
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      });
    });

// Get a user by ID
const getUser = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid user ID." });
  }

  return User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid user ID." });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found." });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      });
    });
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);

      if (err.code === 11000) {
        return res.status(409).send({
          message: "This email is already in use.",
        });
      }

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login,
};
