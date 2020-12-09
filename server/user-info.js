module.exports = (app) => {
  app.get('/dashboard', (req, res) => {
    console.log("dashboard session:", req.session);
    
    res.json({
      name: "Bob"
    });
  });
};