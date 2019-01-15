const mongoose = require('mongoose');
const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const databaseService = require('../services/databaseService');
const permissionService= require('../services/permissionService');
const express = require('express');
const insufficientPermissions = require('../util/insufficientPermissions');

const voteRouter = express.Router();

const createVote = (req, res) => {
    (async function createVote(){
        try {
            let organisationId = req.query.organisationId;
            let voteName = req.query.voteName;
            let voteDescription = req.query.description;
            let voteEndTime = req.query.endTime;

            let hasPermission = await permissionService.field.vote.create(organisationId, req.user);
            if(!!req.user & hasPermission){
                databaseService.vote.create(organisationId, voteName, voteDescription, voteEndTime);
                res.send("OK");
            } else {
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
            res.send("An Error occured.");
        }
    }())
}

const closeVote = (req, res) => {
    (async function closeVote(){
        try {
            let voteId = req.query.idOfVote;
            let organisationId = req.query.organisationId;

            let hasPermission = await permissionService.field.vote.close(organisationId, req.user);

            if(!!req.user & hasPermission){
                databaseService.vote.close(voteId);
                res.send("OK");
            } else {
                insufficientPermissions();
            }
        } catch (err) {
            console.log(err);
            res.send("An Error occured.");
        }
    }())
}

const removeVote = (req, res) => {
    (async function removeVote(){
        try {
            let voteId = req.query.idOfVote;
            let organisationId = req.query.organisationId;

            let hasPermission = await permissionService.field.vote.remove(organisationId, req.user);

            if(!!req.user & hasPermission){
                databaseService.vote.remove(voteId);
                res.send("OK");
            } else {
                insufficientPermissions();
            }
        } catch (err) {
            console.log(err);
            res.send("An Error occured.");
        }
    }())
}

const changeDeadline = (req, res) => {
    (async function changeDeadline(){
        try {
            let voteId = req.query.idOfVote;
            let voteNewEndDate = req.query.newEndDate;
            let organisationId = req.query.organisationId;

            let hasPermission = await permissionService.field.vote.changeEndDate(organisationId, req.user);

            if(!!req.user & hasPermission){
                databaseService.vote.changeEndDate(voteId, newEndDate);
                res.send("OK");
            } else {
                insufficientPermissions();
            }
        } catch (err) {
            console.log(err);
            res.send("An Error occured.");
        }
    }())
}

const castVote = (req, res) => {
    (async function castVote(){
        try {
            let voteId = req.query.idOfVote;
            let vote = req.query.vote;
            let organisationId = req.query.organisationId;

            let hasPermission = await permissionService.field.vote.cast(organisationId, req.user);

            if(!!req.user & hasPermission){
                databaseService.vote.cast(voteId, req.user.id, vote);
                res.send("OK");
            } else {
                insufficientPermissions();
            }
        } catch (err) {
            console.log(err);
            res.send("An Error occured.");
        }
    }())
}

// Get role object?

const initialize = () => {
    voteRouter.get('/create', createVote);
    voteRouter.get('/close', closeVote);
    voteRouter.get('/remove', removeVote);
    voteRouter.get('/changeDeadline', changeDeadline);
    voteRouter.get('/cast', castVote);

    return voteRouter;
}

module.exports.initialize = initialize;