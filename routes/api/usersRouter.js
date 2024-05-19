const express = require("express");
const router = express.Router();
const userController = require("../../controllers/api/usersController");

//user section
router.post("/", userController.createUser);
router.post("/login", userController.userLogin);

router.get("/:userId/orders", userController.getUserOrdersById);

module.exports = router;
