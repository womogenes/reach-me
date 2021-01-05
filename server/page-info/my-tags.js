const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/my-tags', authCheck, async (req, res) => {
    const { userID } = req.session;
    const user = await userdb.model('Tags').findOne({ userID: userID });

    if (!user) {
      res.json([]);
      
    } else {
      const toReturn = await Promise.all(user.tags.map(async tagID => {
        const tag = await userdb.model('ValidTag').findOne({ _id: tagID });
        return {
          name: tag.name,
          category: tag.category
        };
      }));
      res.json(toReturn);
    }
  });
};