const { OAuth2Client } = require('google-auth-library');
const { redirectLogin, redirectDashboard } = require('../redirects.js')();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = ({ app, userdb }) => {
  // Backend verification stuff

  // Session stuff
  app.use(session({
    name: 'awesomename',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Two hours!
      sameSite: true,
      secure: process.env.IN_PROD === 'prod'
    },
    store: new MongoStore({'url': `mongodb+srv://server:${process.env.MONGO_ATLAS_PASSWORD}@reach-me.wwawg.mongodb.net/sessions?retryWrites=true&w=majority`})
  }));

  app.post('/login', async function (req, res) {
    if (true) { //try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const domain = payload['hd'];
      const email = payload['email'];

      // TODO: assert domain is proper

      if (!await userdb.model('User').exists({ email: email })) {
        const user = userdb.model('User')({
          userID: email,
          name: payload['name'],
          email: email,
          picture: payload['picture']
        });
        
        user.save((err, user) => {
          console.log(`User ${user} saved to database.`);
        });
      }

      req.session.userID = email;
      
      res.status(200);
      res.redirect('/dashboard');
      res.end();
      
    } else { // } catch {
      res.sendStatus(400);
    }
  });

  app.post('/logout', (req, res) => {
    req.session.destroy();
  });
};