const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const MongoStore = require('connect-mongo')(session);

module.exports = ({ app, userdb }) => {
  // bodyParser!
  app.use(bodyParser.json());
  app.use(express.json());
  app.use(cors());

  // Session stuff
  app.use(session({
    name: 'awesomename',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Two hours!
      sameSite: true,
      secure: process.env.IN_PROD === 'prod'
    },
    store: new MongoStore({'url': 'mongodb://localhost:27017/sessions'})
  }));
};