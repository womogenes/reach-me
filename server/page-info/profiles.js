module.exports = ({ app, userdb }) => {
  app.get('/user/:userID', (req, res) => {
    console.log(req.params.userID);

    
  });
};