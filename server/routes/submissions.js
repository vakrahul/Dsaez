const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { isAdmin } = require('../middleware/auth');

// @route   POST /api/submissions
// @desc    Submit a solution to a problem
// @access  Private (User)
router.post('/', isAdmin, submissionController.submitSolution);

module.exports = router;