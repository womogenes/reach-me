const express = require('express');
const adminRouter = express.Router();

module.exports = ({ app, userdb }) => {
  require('./admin-pages.js')({ adminRouter });
  require('./pending-bios.js')({ adminRouter, userdb });
  require('./approve-bio.js')({ adminRouter, userdb });
  const { adminCheck } = require('../auth/admin-check.js')({ userdb });

  adminRouter.use(adminCheck);
  app.use('/admin', adminRouter);
};