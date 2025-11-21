const express = require("express");
const router = express.Router();
const apiKeyController = require("../controllers/apiKeyController");
const auth = require("../middleware/auth");

// generate API key (admin only)
router.post("/generate", auth, apiKeyController.generate);

// list semua API key (admin)
router.get("/", auth, apiKeyController.getAll);

// assign API key ke user (admin)
router.post("/assign", auth, apiKeyController.assignToUser);

// delete API key (admin)
router.delete("/:id", auth, apiKeyController.delete);

module.exports = router;
