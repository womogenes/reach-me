const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.post('/add-tags', authCheck, async (req, res) => {
    const { userID } = req.session;
    const userTags = await userdb.model('Tag').findOne({ userID: userID });

    // Make sure the new tag is a valid one
    req.body.newTags.forEach(async tag => {
      if (!tag.name || !tag.category) return;

      const found = await userdb.model('ValidTag').exists({
        name: tag.name,
        category: tag.category
      });

      if (!found) return;

      userTags.tags = tags.tags.concat(req.body.newTags);
    });
  });
};