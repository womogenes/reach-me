// Static routes and whatnot
const path = require('path');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.redirect('/login');
  });
  
  app.get('/dashboard', (req, res) => {
    res.sendFile(path.resolve(('client/dashboard.html')));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.resolve(('client/login.html')));
  });
};