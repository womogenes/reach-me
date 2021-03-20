// Static routes and whatnot
const path = require('path');
const { redirectLogin, redirectDashboard } = require('../redirects.js')();

module.exports = ({ app, userdb }) => {
  // TODO: Can clean this up with a for loop  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../../client/views'));

  require('./dashboard.js')({ app, userdb });

  app.get('/', (req, res) => {
    res.render('landing-page/index.ejs');
  });

  app.get('/login', redirectDashboard, (req, res) => {
    res.render('login.ejs');
  });

  app.get('/user', redirectLogin, (req, res) => {
    res.render('user-profile.ejs');
  });
};