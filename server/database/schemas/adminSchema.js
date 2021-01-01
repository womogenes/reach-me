const mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
  userID: { type: String, index: { unique: true }, required: true },
  access: { type: String, default: "none" }
}, {
  collection: 'admins'
});
adminSchema.index({ userID: 1 }, { unique: true });

mongoose.model('Admin', adminSchema);

mongoose.model('Admin').on('index', err => {
  console.log(err);
});