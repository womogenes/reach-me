const mongoose = require('mongoose');
const fs = require('fs');

// Connect to database
const talkedTodbURI = `mongodb+srv://server:${process.env.MONGO_ATLAS_PASSWORD}@reach-me.wwawg.mongodb.net/talkedTo?retryWrites=true&w=majority`;
const talkedTodb = mongoose.createConnection(talkedTodbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

talkedTodb.on('error', () => console.log('Error connecting to database.'));
talkedTodb.once('open', () => {
  console.log('Connected to talkedTo database!');
  // Require schema files
  fs.readdirSync(`${__dirname}/schemas/talkedTodb`).forEach((filename) => {
    require(`${__dirname}/schemas/talkedTodb/${filename}`);
  });
});

module.exports = () => {
  // Keep in mind, these are connections
  return {
    talkedTodb: talkedTodb
  };
};