const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userID: { type: Number, index: { unique: true }, required: true },
  email: { type: String, default: "My example email" },
  name: { type: String, default: "My name" },
  picture: { type: String, default: "URL to pfp" },
  tags: { type: [String], default: [] },
  talkedTo: { type: [Number], default: [] },
  badges: { type: [String], default: [] }
}, {
  collection: 'users'
});
userSchema.index({ userID: 1 }, { unique: true });

mongoose.model('User', userSchema);

mongoose.model('User').on('index', err => {
  console.log(err);
});