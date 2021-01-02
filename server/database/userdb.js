const mongoose = require('mongoose');
const fs = require('fs');

// Connect to database
const usersdbURI = `mongodb+srv://server:${process.env.MONGO_ATLAS_PASSWORD}@reach-me.wwawg.mongodb.net/users?retryWrites=true&w=majority`;
const userdb = mongoose.createConnection(usersdbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

userdb.on('error', () => console.log('Error connecting to database.'));
userdb.once('open', () => {
  console.log('Connected to user database!');
  // Require schema files
  fs.readdirSync(`${__dirname}/schemas/userdb`).forEach((filename) => {
    require(`${__dirname}/schemas/userdb/${filename}`);
  });
});

module.exports = () => {
  // Keep in mind, these are connections
  return {
    userdb: userdb
  };
};