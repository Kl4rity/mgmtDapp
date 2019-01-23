const databaseService = require('../services/databaseService');
const permissionService = require('../services/permissionService');
const express = require('express');
const insufficientPermissions = require('../util/insufficientPermissions');
const serverError = require('../util/serverError');
const successResponse = require('../util/successResponse');

const organisationRouter = express.Router();

const createOrganisation = (req, res) => {
    console.log(req.body);
    (async function createOrganisation() {
        try {
            let hasPermission = await permissionService.field.organisation.create();
            if (!!req.user & hasPermission) {
                databaseService.organisation.create(req.user, req.body.organisationName);
                successResponse(req, res)
            } else {
                serverError(req, res);
            }
        } catch (err) {
            console.log(err);
        }
    }())
}

const closeOrganisation = (req, res) => {
    (async function closeOrganisation() {
        let organisationId = req.body.organisationId;

        let hasPermission = await permissionService.field.organisation.close(organisationId, req.user);

        if (!!req.user & hasPermission) {
            databaseService.organisation.close(organisationId);
            successResponse(req, res);
        } else {
            insufficientPermissions(req, res);
        }
    }())
}

const addUser = (req, res) => {
    (async function addUser() {
        console.log(req.body);
        try {
            let userToBeAddedId = await databaseService.user.getIdForEmail(req.body.email);
        } catch (err){
            serverError(req, res, "Email not found.");
        }
        let organisationId = req.body.organisationId;
        let hasPermission = await permissionService.field.organisation.addMember(organisationId, req.user);

        if (!!req.user & hasPermission) {
            databaseService.organisation.addMember(organisationId, userToBeAddedId);
            successResponse(req, res)
        } else {
            insufficientPermissions(req, res);
        }
    }())
}

const removeUser = (req, res) => {
    (async function removeUser() {
        let userToBeRemoved = req.query.userId;
        let organisationId = req.query.organisationId;

        let hasPermission = await permissionService.field.organisation.removeMember(organisationId, userToBeRemoved);

        if (!!req.user & hasPermission) {
            databaseService.removeMember(organisationId, userToBeRemoved);
            successResponse(req, res)
        } else {
            insufficientPermissions(req, res);
        }
    }())
}

const initialize = () => {
    organisationRouter.post('/create/', createOrganisation);
    organisationRouter.post('/close/', closeOrganisation);
    organisationRouter.post('/add/', addUser);
    organisationRouter.post('/remove/', removeUser);

    return organisationRouter;
}

module.exports.initialize = initialize;