module.exports = ({ adminRouter, userdb }) => {
  adminRouter.use('/pending-bios', async (req, res) => {
    const pendingBios = await userdb.model('PendingBio').find({}, null, { sort: { updatedAt: 1 } });
    res.json(pendingBios.map(bio => {
      return {
        userID: bio.userID,
        bio: bio.bio
      };
    }));
  });
};