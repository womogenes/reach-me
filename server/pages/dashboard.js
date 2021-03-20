const { redirectLogin, redirectDashboard } = require('../redirects.js')();
const myInfo = require('../page-info/my-info');

module.exports = ({ app, userdb }) => {
  app.get('/dashboard', redirectLogin, async (req, res) => {
    const userInfo = await myInfo(req.session.userID, userdb);
    if (userInfo === 500) { res.sendStatus(500); return; }

    console.log(userInfo, 'asdfsadfasdfasfasdfdsa');

    res.render('dashboard.ejs', {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture
    });
  });
};