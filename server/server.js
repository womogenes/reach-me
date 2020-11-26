const express = require('express');
const app = express();
require('./file-server.js')(app);

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('00711102798-gqpcclrmtra6q03cvpi0hfkluqkn3q3v.apps.googleusercontent.com');
const verify = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: '00711102798-gqpcclrmtra6q03cvpi0hfkluqkn3q3v.apps.googleusercontent.com',
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const domain = payload['hd'];

  console.log(userid);
  console.log(domain);
}

// Backend verification stuff
app.post('/login', (req, res) => {

  const token = req.body.idToken;
  verify(token);

});