module.exports = ({ app, userdb }) => {
  app.get('/all-users', (req, res) => {
    userdb.model('User').find({}, (err, users) => {
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
  });
};