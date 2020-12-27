const mongoose = require('mongoose');
const fs = require('fs');

// Connect to database
const userdb = mongoose.createConnection('mongodb://localhost:27017/users', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

userdb.on('error', () => console.log('Error connecting to database.'));
userdb.once('open', () => {
  console.log('Connected to user database!');
  // Require schema files
  fs.readdirSync(__dirname + '/schemas').forEach((filename) => {
    require(__dirname + '/schemas/' + filename);
  });
});

module.exports = () => {
  // Keep in mind, these are connections
  return {
    userdb: userdb
  };
};