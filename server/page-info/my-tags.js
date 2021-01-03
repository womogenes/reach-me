const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/my-tags', authCheck, async (req, res) => {
    const { userID } = req.session;
    const user = await userdb.model('Tags').findOne({ userID: userID });

    if (!user) {
      res.json({ tags: [] });
    }
    else {
      res.json({ tags: user.tags });
    }
    
  });
};