const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  date: { type: Date, required: true },
  link: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
  ],
  image: { type: String }
});

module.exports = mongoose.model('Publication', publicationSchema);