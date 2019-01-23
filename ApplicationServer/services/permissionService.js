const mongoose = require('mongoose');
const Organisation = mongoose.model('Organisation');
const userRoles = require('../models/Roles/roles');

const permissionService = {
    getRoleObjectForUserIdAndOrgansisation : (organisationId, callingUser) => {
        return (async function checkUserPermission(){
            let requestedOrganisation = await Organisation.findById(organisationId).exec();
            let userMembership = requestedOrganisation.members.filter((member)=>{
                return member.user == callingUser.id;
            })[0];

            let roleObject = userRoles.filter((role)=>{
                return role.name == userMembership.role;
            })[0];

            return roleObject;
        }())
    }
    , field : {
        vote : {
            create : (organisationId, callingUser) => {
                return (async function getCastCreatePermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.vote.create;
                }());
            },
            close : (organisationId, callingUser) => {
                return (async function getCastClosePermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.vote.close;
                }());
            },
            remove : (organisationId, callingUser) => {
                return (async function getCastRemovePermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.vote.remove;
                }());
            },
            cast : (organisationId, callingUser) => {
                return (async function getCastPermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.vote.cast;
                }());
            },
            changeEndDate : (organisationId, callingUser) => {
                return (async function getChangeEndDatePermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.vote.changeEndDate;
                }());
            }
        }
        , organisation : {
            create : () => {
                return true;
            },
            addMember : (organisationId, callingUser) => {
                return (async function getAddMemberPermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.organisation.addMember;
                }());
            },
            removeMember : (organisationId, callingUser) => {
                return (async function getAddMemberPermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.organisation.removeMember;
                }());
            },
            close : (organisationId, callingUser) => {
                return (async function getAddMemberPermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.organisation.close;
                }());
            }
        }
        , member : {
            changeRole : (organisationId, callingUser) => {
                return (async function getAddMemberPermissionStatus(){
                    let roleObject = await permissionService.getRoleObjectForUserIdAndOrgansisation(organisationId,callingUser);
                    return roleObject.permissions.member.changeRole;
                }());
            }
        }
    }
}

module.exports = permissionService;