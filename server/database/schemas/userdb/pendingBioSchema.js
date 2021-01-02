const mongoose = require('mongoose');

let pendingBioSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  bio: { type: String, default: '' }
}, {
  collection: 'pendingBios',
  timestamps: true
});
pendingBioSchema.index({ userID: 1 }, { unique: true });

mongoose.model('PendingBio', pendingBioSchema);

mongoose.model('PendingBio').on('index', err => {
  console.log(err);
});