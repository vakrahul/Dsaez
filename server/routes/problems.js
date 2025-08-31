const express = require('express');
const router = express.Router();
// Corrected the path to include the 's' in problemsController
const problemController = require('../controllers/problemsController');
const { isAdmin } = require('../middleware/auth');

// @route   GET /api/problems
// @desc    Get all problems
// @access  Public
router.get('/', problemController.getProblems);

// @route   GET /api/problems/:id
// @desc    Get a single problem by ID
// @access  Public
router.get('/:id', problemController.getProblemById);

// @route   POST /api/problems
// @desc    Add a new problem (Admin only)
// @access  Private (Admin)
router.post('/', isAdmin, problemController.addProblem);

module.exports = router;
