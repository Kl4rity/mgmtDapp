const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const User = require('../models/User').User;
const seedDb = require('../dev_tools/db_seeder.script');
const express = require('express');

const testRouter = express.Router();

const respondWithInput = (req, res) => {
    res.send(req.params);
}

const respondWithContentOfUserDbAsJSON = (req, res) => {
    (async function execute() {
        let users = await User.find({});

        if (users.length < 1) {
            seedDb();
        }
        res.json(users);
    }());
}

const initialize = () => {
    testRouter.get('/user/:id', respondWithInput);
    testRouter.get('/all', respondWithContentOfUserDbAsJSON);

    testRouter.get('/login', (req, res) =>{
        res.send("Works.");
    });
    testRouter.post('/login', (req, res, next)=>{
        passport.authenticate('facebook', (err, user, info)=>{
            debug("passport.authenticate");
            debug(err);
            debug(user);
            debug(info);
        }),
        next();
    });

    return testRouter;
}

module.exports.initialize = initialize;