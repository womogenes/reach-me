// Static routes and whatnot
const path = require('path');
const { redirectLogin, redirectDashboard } = require('./redirects.js')();

module.exports = (app) => {
  // TODO: Can clean this up with a for loop  
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '/../client/views'));

  app.get('/', (req, res) => {
    res.render('landing-page/index.ejs');
  });

  app.get('/dashboard', redirectLogin, (req, res) => {
    res.render('dashboard.ejs');
  });

  app.get('/login', redirectDashboard, (req, res) => {
    res.render('login.ejs');
  });

  app.get('/directory', redirectLogin, (req, res) => {
    res.render('directory.ejs');
  });

  app.get('/user', redirectLogin, (req, res) => {
    res.render('user-profile.ejs');
  });
};