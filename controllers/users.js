import User from "../models/user.js";

export const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

export const getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

export const createUser = (req, res, next) => {
  User.create({
    name: req.body.name,
    avatar: req.body.avatar,
  })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};
