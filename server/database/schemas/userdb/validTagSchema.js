const mongoose = require('mongoose');

let validTagSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  category: { type: String }
}, {
  collection: 'validTags'
});
validTagSchema.index({ userID: 1 }, { unique: true });

mongoose.model('ValidTag', validTagSchema);

mongoose.model('ValidTag').on('index', err => {
  console.log(err);
});