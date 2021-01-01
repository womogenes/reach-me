// Static routes and whatnot
const path = require('path');
const { redirectLogin, redirectDashboard } = require('../redirects.js')();

module.exports = ({ adminRouter }) => {
  // TODO: Can clean this up with a for loop

  adminRouter.get('/approve-bios', redirectLogin, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/admin/approve-bios.html'));
  });
};