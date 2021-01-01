module.exports = ({ userdb }) => {
  const adminCheck = async (req, res, next) => {
    if (!req.session || !req.session.userID) {
      res.sendStatus(401);
      return;
    }

    const admin = await userdb.model('Admin').findOne({ userID: req.session.userID });
    if (!admin) {
      res.sendStatus(401);
      return;
    }

    //console.log(`Admin ${req.session.userID} with access level ${admin.access} did some admin stuff.`);

    next();
  };
  
  return {
    adminCheck: adminCheck
  };
};