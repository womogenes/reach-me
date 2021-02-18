const  { authCheck } = require('../auth/auth-check.js')();
const allBadges = require('../badges/badges1.js');

module.exports = ({ app, userdb }) => {
  app.get('/my-badges', authCheck, async (req, res) => {
    const { userID } = req.session;
    const userBadges = await userdb.model('Badges').findOne({ userID });

    if (userBadges) {
      const result = [];

      for (badgeName of userBadges.badges) {
        if (!(badgeName.name in allBadges)) continue;

        const badge = allBadges[badgeName.name];
        result.push({
          name: badgeName.name,
          title: badge.title,
          description: badge.description
        });
      }

      res.json(result);

    } else {
      res.json([]);
    }
  })
};