module.exports = ({ app, userdb }) => {
  app.get('/dashboard', (req, res) => {
    console.log("dashboard session:", req.session);
    
    userdb.model('User').findOne({ 'userID': req.session.userID }, (err, user) => {
      res.json({
        name: user.name,
        email: user.email,
        picture: user.picture
      });
    });

  });
};