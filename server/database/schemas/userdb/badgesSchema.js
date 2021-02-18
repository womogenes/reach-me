const mongoose = require('mongoose');

let badgesSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  badges: { type: [ { name: String, timestamp: Date } ] }
}, {
  collection: 'badges'
});
badgesSchema.index({ userID: 1 }, { unique: true });

mongoose.model('Badges', badgesSchema);

mongoose.model('Badges').on('index', err => {
  console.log(err);
});