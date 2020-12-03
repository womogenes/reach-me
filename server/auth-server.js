const session = require('express-session');
const sessions = {};

const {OAuth2Client} = require('google-auth-library');
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
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: IN_PROD
    }
  }));

  // ROUTES

  // Backend verification stuff
  app.post('/login', (req, res, next) => {
    next();
  });

  app.use('/login', async (req, res) => {
    console.log("session:", req.session);
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.idToken,
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

      res.sendStatus(200);
      
    } catch {
      res.sendStatus(400);
    }
  });
};