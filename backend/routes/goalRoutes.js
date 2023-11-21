const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalsController');
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, goalController.getGoals).post(protect, goalController.setGoal);
router.route('/:id').put(protect, goalController.updateGoal).delete(protect, goalController.deleteGoal);

module.exports = router;