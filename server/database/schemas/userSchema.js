mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
  userID: { type: Number, index: true, unique: true, default: 0 },
  email: { type: String, default: "My example email" },
  name: { type: String, default: "My name" },
  picture: { type: String, default: "URL to pfp" },
  talkedTo: { type: [Number], default: [] },
  badges: { type: [String], default: [] }
}, {
  collection: 'users'
});

mongoose.model('User', userSchema);