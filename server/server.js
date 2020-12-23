/* SETUP */
const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();

const app = express();

let {
  userdb
} = require('./database/database.js')();
require('./middleware.js')({ app, userdb });
require('./file-server.js')(app);
require('./pages.js')(app);
require('./auth-server.js')({ app, userdb });
require('./user-info.js')({ app, userdb });

// Start the server
const server = http.createServer(app);
const port = process.env.port || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);