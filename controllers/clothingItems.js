const mongoose = require("mongoose");
const validator = require("validator");
const ClothingItem = require("../models/clothingItem");
const InternalServerErrorMessage = require("../utils/errors");

// Get all clothing items
module.exports = {
  getClothingItems: (req, res) =>
    ClothingItem.find({})
      .then((clothingItems) => res.send(clothingItems))
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      ),

  // Create a new clothing item
  createClothingItem: (req, res) => {
    const { name, weather, imageUrl } = req.body;

    if (!name || !weather || !imageUrl) {
      return res.status(400).send({ message: "Invalid item data." });
    }
    if (name.length < 2 || name.length > 30) {
      return res
        .status(400)
        .send({ message: "Name must be between 2 and 30 characters." });
    }
    if (!["hot", "warm", "cold"].includes(weather)) {
      return res.status(400).send({ message: "Invalid weather value." });
    }
    if (!validator.isURL(imageUrl)) {
      return res.status(400).send({ message: "You must enter a valid URL." });
    }

    return ClothingItem.create({ name, weather, imageUrl })
      .then((item) => res.status(201).send(item))
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      );
  },

  // Delete a clothing item by ID
  deleteClothingItem: (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid item ID." });
    }

    return ClothingItem.findByIdAndDelete(id)
      .then((clothingItem) => {
        if (!clothingItem) {
          return res.status(404).send({ message: "Item not found." });
        }
        return res.send(clothingItem);
      })
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      );
  },

  // Like a clothing item
  likeClothingItem: (req, res) => {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).send({ message: "Invalid item ID." });
    }

    return ClothingItem.findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    )
      .then((clothingItem) => {
        if (!clothingItem) {
          return res.status(404).send({ message: "Item not found." });
        }
        return res.send(clothingItem);
      })
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      );
  },

  // Dislike a clothing item
  dislikeClothingItem: (req, res) => {
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).send({ message: "Invalid item ID." });
    }

    return ClothingItem.findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true }
    )
      .then((clothingItem) => {
        if (!clothingItem) {
          return res.status(404).send({ message: "Item not found." });
        }
        return res.send(clothingItem);
      })
      .catch(() =>
        res.status(500).send({ message: InternalServerErrorMessage })
      );
  },
};
