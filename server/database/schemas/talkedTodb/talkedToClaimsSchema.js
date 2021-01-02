const mongoose = require('mongoose');

let talkedToClaimsSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  talkedToClaims: { type: [String], default: [] }
}, {
  collection: 'talkedToClaims'
});
talkedToClaimsSchema.index({ userID: 1 }, { unique: true });

mongoose.model('TalkedToClaims', talkedToClaimsSchema);

mongoose.model('TalkedToClaims').on('index', err => {
  console.log(err);
});