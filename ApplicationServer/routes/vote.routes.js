const databaseService = require('../services/databaseService');
const permissionService= require('../services/permissionService');
const express = require('express');
const insufficientPermissions = require('../util/insufficientPermissions');
const serverError = require('../util/serverError.js');
const successResponse = require('../util/successResponse');

const voteRouter = express.Router();

const createVote = (req, res) => {
    (async function createVote(){
        try {
            let organisationId = req.body.organisationId;
            let voteName = req.body.name;
            let voteDescription = req.body.description;
            let voteEndTime = req.body.endDate;

            let hasPermission = await permissionService.field.vote.create(organisationId, req.user);
            if(!!req.user & hasPermission){
                databaseService.vote.create(organisationId, voteName, voteDescription, voteEndTime);
                successResponse(req, res);
            } else {
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
            serverError(req, res);
        }
    }())
}

const closeVote = (req, res) => {
    (async function closeVote(){
        try {
            let voteId = req.body.idOfVote;
            let organisationId = req.body.organisationId;

            let hasPermission = await permissionService.field.vote.close(organisationId, req.user);

            if(!!req.user & hasPermission){
                databaseService.vote.close(voteId);
                successResponse(req, res);
            } else {
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
            serverError(req, res);
        }
    }())
}

const removeVote = (req, res) => {
    (async function removeVote(){
        try {
            let voteId = req.body.idOfVote;
            let organisationId = req.body.organisationId;

            let hasPermission = await permissionService.field.vote.remove(organisationId, req.user);

            if(!!req.user & hasPermission){
                databaseService.vote.remove(voteId);
                successResponse(req, res);
            } else {
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
            serverError(req, res);
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
                databaseService.vote.changeEndDate(voteId, voteNewEndDate);
                successResponse(req, res);
            } else {
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
            serverError(req, res);
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
                successResponse(req, res);
            } else {
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
            serverError(req, res);
        }
    }())
}

// Get role object?

const initialize = () => {
    voteRouter.post('/create', createVote);
    voteRouter.post('/close', closeVote);
    voteRouter.post('/remove', removeVote);
    voteRouter.get('/changeDeadline', changeDeadline);
    voteRouter.get('/cast', castVote);

    return voteRouter;
}

module.exports.initialize = initialize;