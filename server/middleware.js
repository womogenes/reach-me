const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = ({ app, userdb }) => {
  // Session stuff
  app.use(session({
    name: "awesomename",
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESS_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2, // Two hours
      sameSite: true,
      secure: process.env.IN_PROD === 'prod'
    },
    store: new MongoStore({'url': 'mongodb://localhost:27017/sessions'})
  }));

  // Getting user every time
  app.use((req, res, next) => {
    if (!req.session) {
      res.locals.user = null;
    }

    const { userID } = req.session;

    if (userID) {
      userdb.model('User').findOne({ 'userID': userID }, (err, user) => {
        res.locals.user = user;
        next();
      });

    } else {
      res.locals.user = null;
      next();
    }
  });
};