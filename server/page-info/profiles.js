module.exports = ({ app, userdb }) => {
  app.get('/user-info/:userID', (req, res) => {
    const reqID = parseInt(req.params.userID);
 
    // If the user requests themselves, redirect to dashboard
    if (reqID === req.session.userID) {
      res.sendStatus(308);
    }

    // Otherwise, get the requested user
    userdb.model('User').findOne({ userID: reqID }, (err, user) => {
      const userInfo = {
        userID: user.userID,
        name: user.name,
        email: user.email,
        picture: user.picture,
        tags: user.tags,
        badges: user.badges
      };
      res.json(userInfo);
    });
  });
};