const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  adress: { type: String, required: true },
  email: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Profile', profileSchema);