module.exports = (app) => {
  // Redirect to login
  const redirectLogin = (req, res, next) => {
    if (!req.session.userID && req.originalUrl != '/login') {
      console.log(req.originalUrl, req.session);
      res.redirect('/login');
    } else {
      next();
    }
  };
  const redirectDashboard = (req, res, next) => {
    if (req.session.userID && req.originalUrl != '/dashboard') {
      res.redirect('/dashboard');
    } else {
      next();
    }
  };

  return {
    redirectLogin: redirectLogin,
    redirectDashboard: redirectDashboard
  };
};