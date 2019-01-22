const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const databaseService = require('../services/databaseService');
const permissionService = require('../services/permissionService');
const express = require('express');
const insufficientPermissions = require('../util/insufficientPermissions');

const organisationRouter = express.Router();

const createOrganisation = (req, res) => {
    console.log(req.body);
    (async function createOrganisation() {
        try {
            let hasPermission = await permissionService.field.organisation.create();
            if (!!req.user & hasPermission) {
                databaseService.organisation.create(req.user, req.body.organisationName);
                res.send("OK");
            } else {
                // Differentiate between not being logged in and not having the permissions?
                insufficientPermissions(req, res);
            }
        } catch (err) {
            console.log(err);
        }
    }())
}

const closeOrganisation = (req, res) => {
    (async function closeOrganisation() {
        let organisationId = req.query.organisationId;

        let hasPermission = await permissionService.field.organisation.close(organisationId, req.user);

        if (!!req.user & hasPermission) {
            databaseService.organisation.close(organisationId);
            res.send("OK");
        } else {
            insufficientPermissions(req, res);
        }
    }())
}

const addUser = (req, res) => {
    (async function addUser() {
        let userToBeAddedId = req.query.userId;
        let organisationId = req.query.organisationId;

        let hasPermission = await permissionService.field.organisation.addMember(organisationId, req.user);

        if (!!req.user & hasPermission) {
            databaseService.addMember(organisationId, userToBeAddedId);
            res.send("OK");
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
            res.send("OK");
        } else {
            insufficientPermissions(req, res);
        }
    }())
}

const initialize = () => {
    organisationRouter.post('/create/', createOrganisation);
    organisationRouter.get('/close/', closeOrganisation);
    organisationRouter.get('/add/', addUser);
    organisationRouter.get('/remove/', removeUser);

    return organisationRouter;
}

module.exports.initialize = initialize;