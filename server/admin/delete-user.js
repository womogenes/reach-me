module.exports = ({ adminRouter, userdb, talkedTodb }) => {
  adminRouter.post('/delete-user', async (req, res) => {
    const toDeleteID = req.query.userID;
    if (!toDeleteID) {
      res.sendStatus(400);
      return;
    }

    /*
    CLEAR OUT:
    1. profile
    2. bio
    3. any pending bios
    4. tags
    5. talked to
    6. talked to claims
    */
    
    await userdb.model('User').deleteOne({ userID: toDeleteID });
    await userdb.model('Bio').deleteOne({ userID: toDeleteID });
    await userdb.model('PendingBio').deleteOne({ userID: toDeleteID });
    await userdb.model('Tags').deleteOne({ userID: toDeleteID });
    await talkedTodb.model('TalkedTo').deleteOne({ userID: toDeleteID });
    await talkedTodb.model('TalkedToClaims').deleteOne({ userID: toDeleteID });

    res.sendStatus(204);
  });
};