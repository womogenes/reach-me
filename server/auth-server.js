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
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: IN_PROD
    }
  }));

  const verify = async (token, res) => {
    if (true) { //try {
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

      //console.log(users);

      res.status(200).send();
      
    } else { //} catch {
      res.status(400).send();
    }
  };

  // ROUTES

  // Backend verification stuff
  app.post('/login', (req, res) => {
    console.log(req.session);
    
    const token = req.body.idToken;
    verify(token, res);
  });
};