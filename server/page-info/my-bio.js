const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/my-bio', authCheck, async (req, res) => {
    const { userID } = req.session;

    const user = await userdb.model('Bio').findOne({ 'userID': userID });

    if (!user) res.json({ bio: 'Not written yet!' });
    else res.json({ bio: user.bio });
  });
};