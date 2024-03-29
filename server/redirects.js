module.exports = (app) => {
  // Redirect to login
  const redirectLogin = (req, res, next) => {
    if ((!req.session || !req.session.userID) && req.originalUrl !== '/login') {
      res.redirect('/login');
    } else {
      next();
    }
  };
  const redirectDashboard = (req, res, next) => {
    if ((req.session && req.session.userID) && req.originalUrl !== '/dashboard') {
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