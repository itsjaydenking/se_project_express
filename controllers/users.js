const mongoose = require("mongoose");
const validator = require("validator");
const User = require("../models/user");
const InternalServerErrorMessage = require("../utils/errors");

module.exports = {
  // Get all users
  getUsers: (req, res) =>
    User.find({})
      .then((users) => res.send(users))
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      ),

  // Get user by ID
  getUser: (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid user ID." });
    }

    return User.findById(id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({ message: "User not found." });
        }
        return res.send(user);
      })
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      );
  },

  // Create a new user
  createUser: (req, res) => {
    const { name, avatar } = req.body;

    if (!name || !avatar) {
      return res.status(400).send({ message: "Invalid user data." });
    }

    if (name.length < 2 || name.length > 30) {
      return res
        .status(400)
        .send({ message: "Name must be between 2 and 30 characters." });
    }

    if (!validator.isURL(avatar)) {
      return res.status(400).send({ message: "You must enter a valid URL." });
    }

    return User.create({ name, avatar })
      .then((user) => res.send(user))
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      );
  },
};
