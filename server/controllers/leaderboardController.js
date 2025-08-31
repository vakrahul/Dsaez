const User = require('../models/user');

exports.getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({})
            .sort({ score: -1 }) // Sort by score in descending order
            .limit(10) // Get top 10 users
            .select('username score'); // Only select username and score

        res.json(leaderboard);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};