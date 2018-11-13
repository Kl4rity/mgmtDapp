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

    testRouter.post('/login',(req, res)=>{
        passport.authenticate('facebook', { scope: 'email' });
    });

    testRouter.get('/login',(req, res)=>{
        passport.authenticate('facebook', { scope: 'email' });
    });

    // testRouter.get('/login', (req, res)=>{
    //     debug("requested login");
    //     passport.authenticate('facebook', ()=>{
    //         res.send("Hi.");
    //     });
    // });

    testRouter.get('/login/callback', (req, res) => {
        res.send(res.user);
    });

    return testRouter;
}

module.exports.initialize = initialize;