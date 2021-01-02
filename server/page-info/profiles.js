const { authCheck } = require('../auth/auth-check.js')();

module.exports = ({ app, userdb, talkedTodb }) => {
  app.get('/user-info', authCheck, async (req, res) => {
    const reqID = req.query.userID;
 
    // Not allowed for the user to request themselves
    if (reqID === req.session.userID) {
      res.sendStatus(400);
      return;
    }

    // Otherwise, get the requested user
    const user = await userdb.model('User').findOne({ userID: reqID });

    if (!user) {
      res.sendStatus(404);
      return;
    }

    const userInfo = {
      userID: user.userID,
      name: user.name,
      email: user.email,
      picture: user.picture,
      tags: user.tags
    };
    res.json(userInfo);
  });

  app.get('/user-bio', authCheck, async (req, res) => {
    const reqID = req.query.userID;
 
    // Impossible
    if (reqID === req.session.userID) {
      res.sendStatus(404);
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

  app.get('/did-talk-to', authCheck, async (req, res) => {
    const { userID } = req.session;
    const otherID = req.query.userID;

    // User can't have talked to themselves
    if (userID === otherID) {
      res.status(400);
      return;
    }
    
    const talkedTo = await talkedTodb.model('TalkedTo').findOne({ userID: userID });

    if (talkedTo) {
      if (talkedTo.talkedTo.includes(otherID)) {
        res.json({ status: 'yes' });

      } else {
        const claims = await talkedTodb.model('TalkedToClaims').findOne({ userID: userID });

        if (claims && claims.talkedToClaims.includes(otherID)) {
          res.json({ status: 'pending' });
        } else {
          res.json({ status: 'no' });
        }
      }

    } else {
      res.json({ status: 'no' });
    }

  });
};