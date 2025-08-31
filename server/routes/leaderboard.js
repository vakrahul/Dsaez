const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// @route   GET /api/leaderboard
// @desc    Get top users by score
// @access  Public
router.get('/', leaderboardController.getLeaderboard);

module.exports = router;
