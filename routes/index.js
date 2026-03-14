const router = require("express").Router();

const auth = require("../middlewares/auth");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

const { login, createUser } = require("../controllers/users");
const {
  validateLogin,
  validateUserBody,
} = require("../middlewares/validation");

router.post("/signin", validateLogin, login);
router.post("/signup", validateUserBody, createUser);

router.use("/items", clothingItemRouter);

router.use("/users", auth, userRouter);

module.exports = router;
