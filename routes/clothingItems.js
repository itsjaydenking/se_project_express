import express from "express";
import {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
} from "../controllers/clothingItems.js";

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

export default itemRouter;
