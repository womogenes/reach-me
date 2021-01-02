const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const rateLimit = require('express-rate-limit');

// 100 requests per second
const limiter = rateLimit({
  windowMs: 1 * 1000,
  max: 100
});

module.exports = ({ app, userdb }) => {
  // bodyParser!
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());
  app.use(limiter);
};