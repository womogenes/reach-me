// Static routes and whatnot
const path = require('path');

module.exports = ({ adminRouter }) => {
  // TODO: Can clean this up with a for loop

  adminRouter.get('/approve-bios', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/admin/approve-bios.html'));
  });
};