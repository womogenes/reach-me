const { redirectLogin } = require('../redirects.js')();
const myInfo = require('../page-info/my-info.js');
const myBio = require('../page-info/my-bio.js');
const myTags = require('../page-info/my-tags.js');

module.exports = ({ app, userdb }) => {
  app.get('/dashboard', redirectLogin, async (req, res) => {
    const { userID } = req.session;

    const userInfo = await myInfo(userID, userdb);
    if (userInfo === 500) { res.sendStatus(500); return; }

    const userBio = await myBio(userID, userdb);

    const userTags = await myTags(userID, userdb);

    res.render('dashboard.ejs', {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      bio: userBio,
      tags: userTags
    });
  });
};