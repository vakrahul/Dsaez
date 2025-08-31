const User = require('../models/user');
const Problem = require('../models/problem');

// This controller handles the logic for a user submitting a solution.
exports.submitSolution = async (req, res) => {
    // The user ID is available from the auth middleware
    const userId = req.user.id;
    const { problemId, solution } = req.body;

    try {
        // Find the user and the problem
        const user = await User.findById(userId);
        const problem = await Problem.findById(problemId);

        if (!user || !problem) {
            return res.status(404).json({ msg: 'User or problem not found' });
        }

        // Check if the user has already solved this problem
        if (user.problemsSolved.includes(problemId)) {
            return res.status(400).json({ msg: 'You have already solved this problem' });
        }

        // Simulate a successful submission
        // In a real application, you would run the code against test cases here
        const isCorrect = true; // Placeholder for logic

        if (isCorrect) {
            // Update user's score and list of solved problems
            user.score += problem.points;
            user.problemsSolved.push(problemId);
            await user.save();

            // Store the submission
            // This is where you would save the submission to the submissions collection
            // For now, we'll just send a success message.

            res.json({ msg: 'Solution submitted successfully! Points added to your score.' });
        } else {
            res.status(400).json({ msg: 'Incorrect solution. Try again.' });
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
