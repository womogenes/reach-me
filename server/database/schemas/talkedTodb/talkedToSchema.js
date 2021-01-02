const mongoose = require('mongoose');

let talkedToSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  talkedTo: { type: [String], default: [] }
}, {
  collection: 'talkedTo'
});
talkedToSchema.index({ userID: 1 }, { unique: true });

mongoose.model('TalkedTo', talkedToSchema);

mongoose.model('TalkedTo').on('index', err => {
  console.log(err);
});