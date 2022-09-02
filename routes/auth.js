const express = require("express")
const router = express.Router();
const { handleLogin } = require("../controllers/authController.js");

router.get('/', handleLogin);

module.exports = router;