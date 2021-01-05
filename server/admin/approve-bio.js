module.exports = ({ adminRouter, userdb }) => {
  adminRouter.post('/approve-bio/:userID', async (req, res) => {
    const approvedID = req.params.userID;

    const approvedBio = await userdb.model('PendingBio').findOne({ userID: approvedID });
    if (!approvedBio) {
      res.status(400).send({
        message: 'Approved user does not have a pending bio.'
      });
      return;
    }

    const userBio = await userdb.model('Bio').findOne({ userID: approvedID });
    if (!userBio) {
      const newUserBio = userdb.model('Bio')({
        userID: approvedID,
        bio: approvedBio.bio
      });
      newUserBio.save();

    } else {
      userBio.bio = approvedBio.bio;
      userBio.save();
    }

    await userdb.model('PendingBio').deleteOne({ userID: approvedID });

    res.sendStatus(204);
  });
};