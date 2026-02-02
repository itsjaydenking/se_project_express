const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  UNAUTHORIZED,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require("../utils/errors");

// User login
const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST).send({
      message: "Email and password are required.",
    });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);

      if (err && err.message === "Incorrect email or password") {
        return res.status(UNAUTHORIZED).send({ message: err.message });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      });
    });
};

// Get Current User
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  return User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

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

  if (!name || !avatar || !email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "All fields are required." });
  }

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userObject = user.toObject();
      delete userObject.password;
      res.status(OK).send(userObject);
    })
    .catch((err) => {
      console.error(err);

      if (err && err.code === 11000) {
        return res.status(CONFLICT).send({
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

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: err.message });
      }

      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: "User not found." });
      }

      return res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      });
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  updateUser,
};
