const mongoose = require('mongoose');
const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const User = mongoose.model('User');
const Organisation = mongoose.model('Organisation');
const Vote = mongoose.model('Vote');
const express = require('express');

const userRouter = express.Router();

const sendUserData = (req, res) => {
    // Fetch all the data for a user.
    (async function getOrganisationsForUser(){
        let usersOrganisations = await Organisation.find({'members.userId': req.user.id}).exec();
        let voteIds = [];
        usersOrganisations.forEach((organisation)=>{
            voteIds.push(...organisation.votes);
        });
        // Find votes for organisations instead - even if the user is not part of it.
        userVotes = await Vote.find({
            '_id' : {$in: voteIds.map(id => mongoose.Types.ObjectId(id))}
        }).exec();

        let responseObject = {
            user : req.user,
            usersOrganisations,
            userVotes
        }

        res.send(responseObject);
    }());
}

// If no User is logged in - send him to the login page.

const initialize = () => {
    userRouter.get('/', sendUserData);

    return userRouter;
}

module.exports.initialize = initialize;