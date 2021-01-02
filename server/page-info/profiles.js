const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb }) => {
  app.get('/user-info/:userID', authCheck, async (req, res) => {
    const reqID = req.params.userID;
 
    // Not allowed for the user to request themselves
    if (reqID === req.session.userID) {
      res.sendStatus(400);
      return;
    }

    // Otherwise, get the requested user
    const user = await userdb.model('User').findOne({ userID: reqID });
    const userInfo = {
      userID: user.userID,
      name: user.name,
      email: user.email,
      picture: user.picture,
      tags: user.tags
    };
    res.json(userInfo);
  });

  app.get('/user-bio/:userID', authCheck, async (req, res) => {
    const reqID = req.params.userID;
 
    // Impossible
    if (reqID === req.session.userID) {
      res.sendStatus(400);
      return;
    }

    // Get the requested user
    const bio = await userdb.model('Bio').findOne({ userID: reqID });
    const userBio = {
      userID: reqID,
      bio: bio ? bio.bio : 'Not written yet!'
    };
    res.json(userBio);
  });
};