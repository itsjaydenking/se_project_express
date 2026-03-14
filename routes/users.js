const router = require("express").Router();
const { getCurrentUser, updateUser } = require("../controllers/users");
const { validateUserBody } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateUser);

module.exports = router;
