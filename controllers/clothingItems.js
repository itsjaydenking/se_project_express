const mongoose = require("mongoose");
const validator = require("validator");
const ClothingItem = require("../models/clothingItem");

const {
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MESSAGE,
} = require("../utils/errors");

// Get all clothing items
const getClothingItems = (req, res) =>
  ClothingItem.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );

// Create a new clothing item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  if (!name || !weather || !imageUrl) {
    return res.status(BAD_REQUEST).send({ message: "Invalid item data." });
  }

  if (name.length < 2 || name.length > 30) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Name must be between 2 and 30 characters." });
  }

  if (!["hot", "warm", "cold"].includes(weather)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid weather value." });
  }

  if (!validator.isURL(imageUrl)) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "You must enter a valid URL." });
  }

  return ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.send(item))
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );
};

// Delete a clothing item by ID
const deleteClothingItem = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndDelete(id)
    .then((clothingItem) => {
      if (!clothingItem) {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res.send(clothingItem);
    })
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );
};

// Like a clothing item
const likeClothingItem = (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res.send(clothingItem);
    })
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );
};

// Dislike a clothing item
const dislikeClothingItem = (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid item ID." });
  }

  return ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      if (!clothingItem) {
        return res.status(NOT_FOUND).send({ message: "Item not found." });
      }
      return res.send(clothingItem);
    })
    .catch(() =>
      res.status(INTERNAL_SERVER_ERROR).send({
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      })
    );
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
