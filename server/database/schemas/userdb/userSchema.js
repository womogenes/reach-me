const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  googleID: { type: Number, default: -1 },
  email: { type: String, default: "My example email" },
  name: { type: String, default: "My name" },
  picture: { type: String, default: "URL to pfp" },
  tags: { type: [String], default: [] },
}, {
  collection: 'users'
});
userSchema.index({ userID: 1 }, { unique: true });

mongoose.model('User', userSchema);

mongoose.model('User').on('index', err => {
  console.log(err);
});