const mongoose = require('mongoose');

let bioSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  bio: { type: String, default: '' }
}, {
  collection: 'bios'
});
bioSchema.index({ userID: 1 }, { unique: true });

mongoose.model('Bio', bioSchema);

mongoose.model('Bio').on('index', err => {
  console.log(err);
});