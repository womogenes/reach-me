module.exports = ({ app, userdb }) => {
  app.get('/dashboard', (req, res) => {
    console.log('dashboard session:', req.session);
    
    user = res.locals.user;
    res.json({
      name: user.name,
      email: user.email,
      picture: user.picture
    });

  });
};