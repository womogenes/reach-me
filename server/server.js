/* SETUP */
const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();

const app = express();

let {
  userdb
} = require('./database/userdb.js')();
require('./middleware.js')({ app, userdb });
require('./auth/auth-server.js')({ app, userdb });
require('./pages.js')(app);

require('./page-info/my-info.js')({ app, userdb });
require('./page-info/profiles.js')({ app, userdb });
require('./page-info/all-users.js')({ app, userdb })
require('./page-info/my-bio.js')({ app, userdb });

require('./user-input/edit-bio.js')({ app, userdb });

require('./file-server.js')(app); // At the end because this uses the '/' path

// Start the server
const server = http.createServer(app);
const port = process.env.port || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);