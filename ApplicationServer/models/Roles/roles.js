const defaultRole = require('./defaultRole');
const memberRole = require('./memberRole');
const moderatorRole = require('./moderatorRole');
const adminRole = require('./adminRole');

const roles = [defaultRole, memberRole, moderatorRole, adminRole];

module.exports = roles;