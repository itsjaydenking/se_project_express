import express from "express";
import {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} from "../controllers/clothingItems.js";

const itemRouter = express.Router();

itemRouter.get("/items", (req, res, next) => {
  getClothingItems(req, res, next);
});
itemRouter.delete("/items/:id", (req, res, next) => {
  deleteClothingItem(req, res, next);
});
itemRouter.post("/items", (req, res, next) => {
  createClothingItem(req, res, next);
});

export default itemRouter;
