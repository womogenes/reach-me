const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client('387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com');

module.exports = ({ app, userdb }) => {
  // Session stuff
  app.use(session({
    name: "awesomename",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Two hours
      sameSite: true,
      secure: process.env.IN_PROD === 'prod'
    },
    store: new MongoStore({'url': 'mongodb://localhost:27017/sessions'})
  }));

  // Backend verification stuff
  app.post('/login', async function(req, res) {
    console.log("session:", req.session);

    if (true) { //try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: '387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      const userID = payload['sub'];
      const domain = payload['hd'];

      const user = userdb.model('User')({
        userID: payload['sub'],
        name: payload['name'],
        email: payload['email'],
        picture: payload['picture']
      });

      // TODOOOOOOOOOOOOOOOO
      user.save((err, user) => {
        console.log(`User ${user} saved to database.`)
      });
      
      // TODO: Add user to database if not exist

      req.session.userID = userID;

      res.status(200);
      res.redirect('/dashboard');
      res.end();
      
    } else { // } catch {
      res.sendStatus(400);
    }
  });
};