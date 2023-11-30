const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authoController");
router.route("/").get(userController.getAllUsers);

router.post("/signUp", authController.createNewAccount);
router.post("/login", authController.loginUsers);
router.get("/logout", authController.logoutUser);
router.route("/me").get(userController.getMe, userController.getOneUser);
module.exports = router;
