const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const User = require('../models/User');
const seedDb = require('../dev_tools/db_seeder.script');
const express = require('express');

const accountRouter = express.Router();

const logUserOut = (req, res) => {
    req.logout();
    res.send("Successfully logged out.");
}

const loginFailure = (req, res) => {
    res.send("There was an error logging you in. Please try again!");
}

const initialize = () => {
    accountRouter.get('/logout', logUserOut);
    accountRouter.get('/login', passport.authenticate('facebook', { scope: ['email'] }));
    accountRouter.get('/login/callback',
        passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login/failed' })
    );
    accountRouter.get('/login/failed', loginFailure)

    return accountRouter;
}

module.exports.initialize = initialize;