module.exports = () => {
  const authCheck = (req, res, next) => {
    if (!req.session || !req.session.userID) {
      res.sendStatus(401);
    } else {
      next();
    }
  };
  
  return {
    authCheck: authCheck
  };
};