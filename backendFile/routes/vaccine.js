const express = require("express");
const router = express.Router();
const vaccineController = require("../controllers/infantsController");
router.post("/addVaccine", vaccineController.addVaccine);
module.exports = router;
