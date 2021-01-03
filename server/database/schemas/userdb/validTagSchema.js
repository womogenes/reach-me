const mongoose = require('mongoose');

let validTagSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  tags: { type: [{ name: String, category: String }], default: [] }
}, {
  collection: 'validTags'
});
validTagSchema.index({ userID: 1 }, { unique: true });

mongoose.model('ValidTag', validTagSchema);

mongoose.model('ValidTag').on('index', err => {
  console.log(err);
});