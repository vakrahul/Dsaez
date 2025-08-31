const mongoose = require('mongoose');
const SubmissionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
    code: { type: String, required: true },
    status: { type: String, required: true, enum: ['Accepted', 'Wrong Answer', 'Time Limit Exceeded'] },
    submittedAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Submission', SubmissionSchema);