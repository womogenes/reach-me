// Static routes and whatnot
const path = require('path');
const { redirectLogin, redirectDashboard } = require('./redirects.js')();

module.exports = (app) => {
  // TODO: Can clean this up with a for loop

  app.get('/dashboard', redirectLogin, (req, res) => {
    res.sendFile(path.resolve(('client/dashboard.html')));
  });

  app.get('/login', redirectDashboard, (req, res) => {
    res.sendFile(path.resolve(('client/login.html')));
  });

  app.get('/directory', redirectLogin, (req, res) => {
    res.sendFile(path.resolve(('client/directory.html')));
  });

  app.get('/user/:userID', redirectLogin, (req, res) => {
    res.sendFile(path.resolve(('client/user-profile.html')));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.resolve(('client/index.html')));
  });
};