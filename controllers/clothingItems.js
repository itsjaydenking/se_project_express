const ClothingItem = require("../models/clothingItem");

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../errors/custom-errors");

// Get all clothing items
const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send(clothingItems))
    .catch(next);
};

// Create a new clothing item
const createClothingItem = (req, res, next) => {
  ClothingItem.create({ ...req.body, owner: req.user._id })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

// Delete a clothing item by ID (only owner can delete)
const deleteClothingItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findById(id)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("Forbidden");
      }
      return item.deleteOne().then(() => res.send(item));
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found."));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID."));
      } else {
        next(err);
      }
    });
};

// Like a clothing item
const likeClothingItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found."));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID."));
      } else {
        next(err);
      }
    });
};

// Dislike a clothing item
const dislikeClothingItem = (req, res, next) => {
  const { id } = req.params;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found."));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID."));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
