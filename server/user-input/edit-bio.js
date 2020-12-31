const bodyParser = require("body-parser");

const bodyParser = require('body-parser');

module.exports = ({ app, userdb }) => {
  app.post('/edit-bio', (req, res) => {
    console.log(req.body);
  });
}