module.exports = ({ app, userdb }) => {
  app.get('/my-info', (req, res) => {
    const { userID } = req.session;
  
    if (userID) {
      userdb.model('User').findOne({ 'userID': userID }, (err, user) => {
        res.json({
          name: user.name,
          email: user.email,
          picture: user.picture
        });
      });
  
    } else {
      res.redirect('/login');
    }
  });
};