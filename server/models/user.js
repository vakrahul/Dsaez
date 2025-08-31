const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  score: { type: Number, default: 0 },
  problemsSolved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
});
module.exports = mongoose.model('User', UserSchema);