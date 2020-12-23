/* SETUP */

const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();

const app = express();

// Global middleware
app.use(bodyParser.json());

let {
  userdb
} = require('./database/database.js')();
require('./middleware.js')({ app, userdb });
require('./auth-server.js')({ app, userdb });
require('./user-info.js')({ app, userdb });
require('./file-server.js')(app);

// Start the server
const server = http.createServer(app);
const port = process.env.port || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);