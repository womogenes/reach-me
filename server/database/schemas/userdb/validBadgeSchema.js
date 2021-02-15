const mongoose = require('mongoose');

let validBadgeSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  category: { type: String }
}, {
  collection: 'validBadges'
});
validBadgeSchema.index({ userID: 1 }, { unique: true });

mongoose.model('ValidBadge', validBadgeSchema);

mongoose.model('ValidBadge').on('index', err => {
  console.log(err);
});