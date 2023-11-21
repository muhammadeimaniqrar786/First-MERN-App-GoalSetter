const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const asyncHandler = require('express-async-handler');
const { protect } = require('../middleware/authMiddleware');

router.get('/me', protect, userController.me);

module.exports = router;
