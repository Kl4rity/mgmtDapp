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
    mountMiddlewares();
    DBConnector();
    initializePassport();
    mountRouters();
};

const mountMiddlewares = () => {
    app.use(morgan('short'));
    app.use(session({ secret: secrets.sessionKey }));
    app.use(bodyParser.urlencoded({ extended: true }));
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

// Execute Scripts
initialize();
startServer();