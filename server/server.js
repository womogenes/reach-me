/* SETUP */

const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();
require('./file-server.js')(app);
require('./user-info.js')(app);

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESS_SECRET = 'secrettt',
  IN_PROD = NODE_ENV === 'production'
} = process.env;


const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);


/* SETUP */

// VARIABLES
const users = {};

require('./auth-server.js')({ app, users });