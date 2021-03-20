const { redirectLogin } = require('../redirects.js')();
const myInfo = require('../page-info/my-info');

module.exports = ({ app, userdb }) => {
  app.get('/challenges', redirectLogin, async (req, res) => {
    const userInfo = await myInfo(req.session.userID, userdb);
    if (userInfo === 500) { res.sendStatus(500); return; }

    res.render('challenges.ejs', {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture
    });
  });
};