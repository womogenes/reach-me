module.exports = ({ app, userdb }) => {

  app.get('/my-bio', async (req, res) => {
    const { userID } = req.session;
  
    if (!userID) {
      res.sendStatus(401);
      return;
    }

    const user = await userdb.model('Bio').findOne({ 'userID': userID });

    if (!user) res.json({ bio: 'Not written yet!' });
    else res.json({ bio: user.bio });
  });
};