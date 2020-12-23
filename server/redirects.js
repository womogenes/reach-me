module.exports = (app) => {
  // Redirect to login
  const redirectLogin = (req, res, next) => {
    console.log('redirected login');
    if (!req.session.userID) {
      res.redirect('/login');
      res.end();

    } else {
      next();
    };
  };
  const redirectDashboard = (req, res, next) => {
    console.log('redirected dashboard');
    if (req.session.userID) {
      res.redirect('/dashboard');
      res.end();

    } else {
      next();
    };
  };
  app.use('/dashboard', redirectLogin);
  app.use('/login', redirectDashboard);

  app.use(/\//, redirectLogin);
  app.use(/\//, redirectDashboard);
}