module.exports = ({ app, userdb }) => {
  app.get('/my-info', (req, res) => {    
    user = res.locals.user;
    res.json({
      name: user.name,
      email: user.email,
      picture: user.picture
    });

  });
};