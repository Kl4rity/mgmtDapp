const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');

const DBConnector = require('./util/dbConnector');
const secrets = require('./secrets/keys');

const app = express();

const initialize = () => {
    setCORSHeader();
    mountMiddlewares();
    DBConnector();
    initializePassport();
    mountRouters();
};

const mountMiddlewares = () => {
    app.use(bodyParser.json());
    app.use(morgan('short'));
    app.use(session({ secret: secrets.sessionKey }));
};

const mountRouters = () => {
    // Routers should be mounted here. This, so far, only mounts a single route for debugging purposes.
    app.use('/test', require('./routes/test.routes').initialize());
};

const initializePassport = () => {
    app.use(passport.initialize());
    app.use(passport.session());
    require('./middleware/passport')();
};

const startServer = () => {
    const port = (process.env.PORT) || 3000;
    app.listen(port);
    if (process.env.PORT != null) {
        this.debug(`Port Number ${this.port} sourced from Environment.`);
    }
    console.log(`Server started on port ${port}.`);
};

const setCORSHeader = () => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

// Execute Scripts
initialize();
startServer();