const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.post('/remove-tags', authCheck, async (req, res) => {
    const { userID } = req.session;
    let userTags = await userdb.model('Tags').findOne({ userID: userID });

    if (!userTags) {
      const newUserTags = userdb.model('Tags')({
        userID: userID,
        tags: []
      });
      await newUserTags.save();
      userTags = newUserTags;
    }

    if (!req.body.toRemove) {
      res.sendStatus(400);
      return;
    }

    // Make sure the new tag is a valid one
    const toRemove = await Promise.all(req.body.toRemove.flatMap(async tag => {
      if (!tag.name || !tag.category) return [];

      const found = await userdb.model('ValidTag').findOne({
        name: tag.name,
        category: tag.category
      });

      if (!found) return [];
      return [found._id];
    }));

    await userdb.model('Tags').updateOne({
      userID: userID
    }, {
      $pullAll: { tags: toRemove }
    });
  });
};