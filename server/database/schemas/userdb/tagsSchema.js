const mongoose = require('mongoose');

let tagsSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  tags: { type: [{ name: String, category: String }], default: [] }
}, {
  collection: 'tags'
});
tagsSchema.index({ userID: 1 }, { unique: true });

mongoose.model('Tags', tagsSchema);

mongoose.model('Tags').on('index', err => {
  console.log(err);
});