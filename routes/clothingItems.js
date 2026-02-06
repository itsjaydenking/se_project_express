const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

const {
  validateClothingItemBody,
  validateId,
} = require("../middlewares/validation");

router.get("/", getClothingItems);

router.post("/", auth, validateClothingItemBody, createClothingItem);
router.delete("/:id", auth, validateId, deleteClothingItem);
router.put("/:id/likes", auth, validateId, likeClothingItem);
router.delete("/:id/likes", auth, validateId, dislikeClothingItem);

module.exports = router;
