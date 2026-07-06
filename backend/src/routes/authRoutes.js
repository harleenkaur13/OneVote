const express = require("express");

const { loginUser, getProfile } = require("../controllers/authController");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

module.exports = router;