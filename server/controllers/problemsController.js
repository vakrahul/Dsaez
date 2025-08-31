const Problem = require('../models/problem');

exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find().select('-testCases');
        res.json(problems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) {
            return res.status(404).json({ msg: 'Problem not found' });
        }
        res.json(problem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addProblem = async (req, res) => {
    const { title, description, difficulty, points, testCases } = req.body;
    try {
        const newProblem = new Problem({ title, description, difficulty, points, testCases });
        const problem = await newProblem.save();
        res.json(problem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
