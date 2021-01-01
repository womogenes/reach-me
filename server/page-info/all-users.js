const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/all-users', authCheck, async (req, res) => {

    const users = await userdb.model('User').find({});
    const toReturn = users.map(user => {
      return {
        userID: user.userID,
        name: user.name,
        picture: user.picture,
        tags: user.tags
      };
    });

    res.json(toReturn);
  });
};