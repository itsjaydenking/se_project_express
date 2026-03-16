const router = require("express").Router();

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

router
  .route("/")
  .get(getClothingItems)
  .post(validateClothingItemBody, createClothingItem);

router.route("/:id").delete(validateId, deleteClothingItem);

router
  .route("/:id/likes")
  .put(validateId, likeClothingItem)
  .delete(validateId, dislikeClothingItem);

module.exports = router;
