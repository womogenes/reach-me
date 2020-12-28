const { OAuth2Client } = require('google-auth-library');
const { redirectLogin, redirectDashboard } = require('./redirects.js')();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = ({ app, userdb }) => {
  // Backend verification stuff

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