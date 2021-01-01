module.exports = ({ app, userdb }) => {
  app.post('/edit-bio', async (req, res) => {
    const { newBio } = req.body;

    if (!newBio) {
      res.sendStatus(400);
      return;
    }

    const { userID } = req.session;

    const pendingBio = await userdb.model('PendingBio').findOne({ 'userID': userID });
    if (!pendingBio) {
      // Pending bio does not exist, create it
      const newPendingBio = userdb.model('PendingBio')({
        userID: userID,
        bio: newBio
      });
      newPendingBio.save();

    } else {
      // Pending bio exists, modify it
      pendingBio.bio = newBio;
      pendingBio.save();
    }

    res.sendStatus(204); // No Content successful
  });
}