module.exports = ({ app, userdb }) => {
  app.get('/my-info', async (req, res) => {
    const { userID } = req.session;
  
    if (userID) {
      const user = await userdb.model('User').findOne({ 'userID': userID });
      if (!user) {
        res.redirect('/login');
        return;
      };
      
      res.json({
        name: user.name,
        email: user.email,
        picture: user.picture
      });
  
    } else {
      res.redirect('/login');
    }
  });
};