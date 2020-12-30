const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

module.exports = ({ app, userdb }) => {
  // bodyParser!
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());
};