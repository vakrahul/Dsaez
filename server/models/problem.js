const mongoose = require('mongoose');
const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  points: { type: Number, required: true },
  tags: [{ type: String }],
  testCases: [{
    input: { type: String, required: true },
    output: { type: String, required: true }
  }],
});
module.exports = mongoose.model('Problem', ProblemSchema);