const express = require('express');
const router = express.Router();
// We will add controllers here later

// @route   POST /api/submissions
// @desc    Submit a solution to a problem
// @access  Private (User)
router.post('/', (req, res) => {
    // Logic for handling problem submission will go here
    res.send('Submission route is working!');
});

module.exports = router;

const problemController = require('../controllers/problemsController');
