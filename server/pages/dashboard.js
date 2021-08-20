const { redirectLogin } = require('../redirects.js')();
const myInfo = require('../page-info/my-info.js');
const myBio = require('../page-info/my-bio.js');
const myTags = require('../page-info/my-tags.js');

module.exports = ({ app, userdb }) => {
  app.get('/dashboard', redirectLogin, async (req, res) => {
    const { userID } = req.session;

    const userInfo = await myInfo(userID, userdb);
    if (userInfo === 500) {
      res.sendStatus(500);
      return;
    } // Oh no! User doesn't exist

    const userBio = await myBio(userID, userdb);

    const userTags = await myTags(userID, userdb);

    const ampIndex = userInfo.email.indexOf('@');
    const grade =
      12 -
      userInfo.email.substring(ampIndex - 2, ampIndex) +
      new Date().getFullYear() -
      2000; // Thing to compute grade based on graduation year and current year

    res.render('dashboard.ejs', {
      name: userInfo.name,
      email: userInfo.email,
      picture: userInfo.picture,
      bio: userBio,
      tags: userTags,
      grade: grade,
    });
  });
};
