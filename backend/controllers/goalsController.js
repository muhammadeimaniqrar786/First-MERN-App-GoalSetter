const asyncHandler = require('express-async-handler');

const Goal = require('../models/goalModel');

// @desc    Get Goals
// @route   Get /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user_id: req.user.id })
    res.json(goals);
});

// @desc    Set Goals
// @route   POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('The Text field is required.');
    }

    const goal = await Goal.create({
        text: req.body.text,
        user_id: req.user.id
    });

    res.status(201).json(goal);
});

// @desc    Update Goals
// @route   PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found.');
    }

    if (goal.user_id.toString() !== req.user.id) {
        res.status(400)
        throw new Error('Not Authorized.')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(201).json(updatedGoal);
});

// @desc    Get Goals
// @route   Get /api/goals
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found.');
    }

    if (goal.user_id.toString() !== req.user.id) {
        res.status(400)
        throw new Error('Not Authorized.')
    }

    await goal.deleteOne();

    res.status(201).json({ id: req.params.id });
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};