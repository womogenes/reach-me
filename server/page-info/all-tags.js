const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/all-tags', authCheck, async (req, res) => {

    const tags = await userdb.model('ValidTag').find({});
    const toReturn = tags.map(tag => {
      return {
        name: tag.name,
        category: tag.category
      };
    });

    res.json(toReturn);
  });
};