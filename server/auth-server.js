const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const {OAuth2Client} = require('google-auth-library');

const sessions = {}; // USE THIS AS A TEMPORARY DATABASE
const client = new OAuth2Client('387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com');

const {
  PORT = 3000,
  NODE_ENV = 'development',
  SESS_SECRET = 'secrettt',
  IN_PROD = NODE_ENV === 'production'
} = process.env;

module.exports = ({ app, users }) => {

  // Session stuff
  app.use(session({
    name: "awesomename",
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Two hours
      sameSite: true,
      secure: IN_PROD
    },
    store: new MongoStore({'url': 'mongodb://localhost:27017/sessions'})
  }));

  // Backend verification stuff
  app.post('/login', async function(req, res, next) {
    console.log("session:", req.session);
    if (true) { //try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: '387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      const userID = payload['sub'];
      const domain = payload['hd'];

      const u = {
        name: payload['name'],
        email: payload['email'],
        picture: payload['picture']
      }
      users[userID] = u;

      req.session.userID = userID;

      res.sendStatus(200);
      
    } else { // catch {
      res.sendStatus(400);
    }
  });
};