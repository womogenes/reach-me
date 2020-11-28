/* SETUP */

const express = require('express');
const session = require('express-session');
const http = require('http');
const path = require('path');
const cors = require('cors');

const app = express();
require('./file-server.js')(app);

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com');

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESS_SECRET = 'secrettt'
} = process.env;

const IN_PROD = NODE_ENV === 'production';

const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug('Server listening on port ' + port);


/* SETUP */

// VARIABLES
const users = {};
// VARIABLES

const verify = async (token, res) => {

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const domain = payload['hd'];

    const u = {
      name: payload['name'],
      email: payload['email'],
      picture: payload['picture']
    }
    users[userid] = u;

    console.log(users);

    res.status(200).send();
    
  } catch {
    res.status(400).send();
  }
};

// Backend verification stuff
app.post('/login', (req, res) => {
  const token = req.body.idToken;
  verify(token, res);
});

// Session stuff
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: SESS_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: true,
    secure: IN_PROD
  }
}));