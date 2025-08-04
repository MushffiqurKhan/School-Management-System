const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../Middleware/Authmiddleware');

router.use("/api/v1/",require("../Controller/AuthController"));

module.exports = router;