const debug = require('debug')("app:test.routes.ts");
const passport = require('passport');
const User = require('../models/User');
const Organisation = require('../models/Organisation');
const express = require('express');

const organisationRouter = express.Router();

const createOrganisation = ( currentUser ) => {

}

// Get role object?

const initialize = () => {
    organisationRouter.post('/create', createOrganisation);

    return organisationRouter;
}

module.exports.initialize = initialize;