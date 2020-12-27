const express = require('express');
const path = require('path');
const cors = require('cors');

module.exports = (app) => {
  app.use(express.static(path.join(__dirname, '/../client')));
}