/* SETUP */
const express = require('express');
const http = require('http');
const dotenv = require('dotenv').config();

const app = express();

let { userdb } = require('./database/userdb.js')();
let { talkedTodb } = require('./database/talkedTodb.js')();

require('./middleware.js')({ app, userdb });
require('./auth/auth-server.js')({ app, userdb });
require('./pages/pages.js')({ app, userdb });

// Info for pages
require('./page-info/profiles.js')({ app, userdb, talkedTodb });
require('./page-info/all-users.js')({ app, userdb });
require('./page-info/my-badges.js')({ app, userdb });
require('./page-info/all-tags.js')({ app, userdb });
require('./page-info/user-tags.js')({ app, userdb });

// User inputs
require('./user-input/edit-bio.js')({ app, userdb });
require('./user-input/talked-to.js')({ app, userdb, talkedTodb });
require('./user-input/add-tags.js')({ app, userdb, talkedTodb });
require('./user-input/remove-tags.js')({ app, userdb, talkedTodb });

// Admin routes
require('./admin/admin.js')({ app, userdb, talkedTodb });

// At the end because this uses the '/' path
require('./file-server.js')(app);

// Start the server
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port);
console.debug('Server listening on port ' + port);
