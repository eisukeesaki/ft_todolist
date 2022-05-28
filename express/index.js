const Express = require('express');
const session = require('express-session');
// const SessionStore
const morgan = require('morgan');
const mountRoutes = require('./routes');

const express = Express();
require('dotenv').config;

express.use(session({
  // TODO: optimize options
  secret: process.env.SESSION_SECRET,
  name: 'sessionID',
  resave: false,
  saveUninitialized: false,
  cookie: { maxage: 30 * 24 * 60 * 60 * 1000 }
  // store: // TODO: use sessions table in db as a session store 
}));
express.use(morgan('dev'));
express.use(Express.urlencoded({ extended: true })); // TODO: mount it only for routes that requires body parsing
express.use(Express.json()); // TODO: mount it only for routes that requires body parsing
express.set('views', `${__rootDir}/views`);
express.set('view engine', 'ejs');

mountRoutes(express);

module.exports = express;

/*

    mount middlewares onto express instance
        request body parser
        routes

*/

