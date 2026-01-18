import mongoose from "mongoose";

import ClothingItem from "../models/clothingItem.js";
import { InternalServerErrorMessage } from "../utils/errors.js";

export const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((clothingItems) => {
      res.send(clothingItems);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};

export const createClothingItem = (req, res) => {
  console.log(req.user._id);
};

export const deleteClothingItem = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid user ID." });
  }

  ClothingItem.findByIdAndDelete(req.params.id)
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};

export const likeClothingItem = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid user ID." });
  }

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};

export const dislikeClothingItem = (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "Invalid user ID." });
  }

  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((clothingItem) => {
      res.send(clothingItem);
    })
    .catch((err) => {
      res.status(500).send({ message: InternalServerErrorMessage });
    });
};
