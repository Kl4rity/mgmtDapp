const mongoose = require('mongoose');
const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const User = mongoose.model('User');
const Organisation = mongoose.model('Organisation');
const Vote = mongoose.model('Vote');
const express = require('express');
const insufficientPermissions = require('../util/insufficientPermissions');

const userRouter = express.Router();

const sendUserData = (req, res) => {
    console.log(req.user);
    if(!!req.user){
        // Fetch all the data for a user.
        (async function getOrganisationsForUser(){
            let organisations = await Organisation.find({'members.user': req.user.id}).populate('members.user').populate('votes').exec();
    
            let responseObject = {
                user : req.user,
                organisations
            }
    
            res.send(responseObject);
        }());
    } else {
        insufficientPermissions(req, res);
    }
}

// If no User is logged in - send him to the login page.

const initialize = () => {
    userRouter.get('/', sendUserData);

    return userRouter;
}

module.exports.initialize = initialize;