const router = require("express").Router();

const auth = require("../middlewares/auth");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");
const { getClothingItems } = require("../controllers/clothingItems");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");

const { NotFoundError } = require("../errors/custom-errors");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

router.get("/items", getClothingItems);

router.use(auth);

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
