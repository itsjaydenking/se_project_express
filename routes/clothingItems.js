const express = require("express");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

const itemRouter = express.Router();

itemRouter.get("/items", (req, res) => {
  getClothingItems(req, res);
});

itemRouter.delete("/items/:id", (req, res) => {
  deleteClothingItem(req, res);
});

itemRouter.post("/items", (req, res) => {
  createClothingItem(req, res);
});

itemRouter.put("/items/:itemId/likes", (req, res) => {
  likeClothingItem(req, res);
});

itemRouter.delete("/items/:itemId/likes", (req, res) => {
  dislikeClothingItem(req, res);
});

module.exports = itemRouter;
