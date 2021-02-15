const mongoose = require('mongoose');

let badgesSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  badges: { type: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ValidBadge'
  }] }
}, {
  collection: 'badges'
});
badgesSchema.index({ userID: 1 }, { unique: true });

mongoose.model('Badge', badgesSchema);

mongoose.model('Badge').on('index', err => {
  console.log(err);
});