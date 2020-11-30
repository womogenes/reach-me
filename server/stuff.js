module.exports = (app) => {
  app.get('/dashboard', (req, res) => {
    console.log(req.session);
    
    res.json({
      name: "Bob"
    });
  });
}