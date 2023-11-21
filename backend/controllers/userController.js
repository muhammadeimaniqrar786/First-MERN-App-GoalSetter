const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

// @desc Get User Data
// @route GET /me
// @access Private
const me = asyncHandler(async (req, res) => {
    res.json(req.user)
});

module.exports = {
    me
};