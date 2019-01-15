const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const https = require('https');
const DBConnector = require('./util/dbConnector');
const secrets = require('./secrets/keys');
const cookieParser = require('cookie-parser');

const app = express();

// Configure secure application
const setCORSHeader = () => {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

const mountMiddlewares = () => {
    app.use(morgan('short'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(session({ 
        secret: secrets.sessionKey,
        store: DBConnector.getSessionStore(),
        resave: true,
        saveUninitialized: true
     }));
};

const initializePassport = () => {
    app.use(passport.initialize());
    app.use(passport.session());
    require('./middleware/passport')();
};

const mountRouters = () => {
    // Routers should be mounted here. This, so far, only mounts a single route for debugging purposes.
    app.use('/account', require('./routes/account.routes').initialize());
    app.use('/organisation', require('./routes/organisation.routes').initialize());
    app.use('/vote', require('./routes/vote.routes').initialize());
    app.use('/', require('./routes/user.routes').initialize())
};

const initializeSecureApplication = () => {
    setCORSHeader();
    DBConnector.establishDbConnection();
    mountMiddlewares();

    require('./models/initializeSchemas')();

    initializePassport();
    mountRouters();
};
initializeSecureApplication();

//Configuring an app that redirects to the https version
const insecureApp = express();
const configureInsecureApp = () => {
    insecureApp.all('*', (req, res, next) => {
        res.redirect(307, `https://localhost/${req.url}`);
        next();
    })
}
configureInsecureApp();

// Start both Servers
const startInsecureRedirectServer = () => {
    const port = (process.env.PORT) || 3000;
    insecureApp.listen(port);
    if (process.env.PORT != null) {
        this.debug(`Port Number ${this.port} sourced from Environment.`);
    }
    console.log(`Redirect server started on port ${port}.`);
}

const TLSoptions = {
    key: fs.readFileSync("./secrets/localhost.key"),
    cert: fs.readFileSync("./secrets/localhost.crt")
}

const startSecureServer = () => {
    const port = 3001;
    try {
        https.createServer(TLSoptions, app).listen(3001);
        console.log(`HTTPS server started on port ${port}.`);
    } catch (err) {
        console.log(`Server could not be started.`);
        console.log(err);
    }
}

const startServers = () => {
    startInsecureRedirectServer();
    startSecureServer();
};
startServers();