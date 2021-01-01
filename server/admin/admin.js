const express = require('express');
const adminRouter = express.Router();

module.exports = ({ app, userdb }) => {
  require('./pending-bios.js')({ adminRouter, userdb });

  app.use('/admin', adminRouter);
};