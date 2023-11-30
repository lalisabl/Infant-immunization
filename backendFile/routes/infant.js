const express = require("express");
const router = express.Router();
const infantController = require("../controllers/infantsController");
router.post("/addInfant", infantController.addInfant);
module.exports = router;
