const Express = require('express');
const express = Express();
const morgan = require('morgan');

express.use(morgan('dev'));
express.use(Express.urlencoded({ extended: true }));
// TODO: setup view engine - ejs
express.set('views', `${__rootDir}/views`);
express.set('view engine', 'ejs');

const mountRoutes = require('./routes');
mountRoutes(express);

module.exports = express;

/*

    mount onto express instance
        request body parser
        routes

*/

