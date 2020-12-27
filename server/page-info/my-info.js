module.exports = ({ app, userdb }) => {
  app.get('/my-info', (req, res) => {
    const { userID } = req.session;
  
    if (userID) {
      userdb.model('User').findOne({ 'userID': userID }, (err, user) => {
        if (!user) res.redirect('/login');
        
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