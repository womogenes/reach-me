const{ authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/my-badges', authCheck, async (req, res) => {
    const { userID } = req.session;
    const userBadges = await userdb.model('Badges').findOne({ userID });

    if (userBadges) {
      res.json(userBadges);
    } else {
      res.json([]);
    }
  })
};