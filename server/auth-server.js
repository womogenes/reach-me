const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('387693423309-jfkf520pn2liuv0qa7l2eh3hkij4s6v6.apps.googleusercontent.com');

module.exports = ({ app, userdb }) => {
  // Backend verification stuff

  // Redirect to login
  const redirectLogin = (req, res, next) => {
    if (!req.session.userID) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  app.use('/dashboard', redirectLogin);

  app.post('/login', async function(req, res) {
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

      user.save((err, user) => {
        console.log(`User ${user} saved to database.`);
      });
      req.session.userID = userID;
      
      res.status(200);
      res.redirect('/dashboard');
      console.log('redirected');
      res.end();
      
    } else { // } catch {
      res.sendStatus(400);
    }
  });
};