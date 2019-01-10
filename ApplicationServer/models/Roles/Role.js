const Organisation = require('../Organisation');
const Vote = require('../Vote');
const User = require('../User');

class Role {
    // Only overwrite the methods if the specified role has more specific behavior.
    // Implement rejection methods here.
    roleName;

    requestRejected(){
        
    }

    organisation = {
        create(callingUser, nameOfOrganisation){
            let organisationReference = new Organisation();

            organisationReference.name = nameOfOrganisation;
            organisationReference.members[callingUser.id] = 'admin';

            organisationReference.save();
        },
        addMember(organisation, idOfMember){
            // Moderator / Admin
            (async function executeAddMember(){
                let organisationReference = await Organisation.findById(organisation.id);
                organisationReference.members[idOfMember] = 'member';

                organisationReference.save();
            }())
        },
        removeMember(organisation, idOfMember){
            // Moderator / Admin
            (async function executeRemoveMember(){
                let organisationReference = await Organisation.findById(organisation.id);
                delete organisationReference.members[idOfMember];

                organisationReference.save();
            }())
        },
        close(organisation){
            // Admin
            (async function executeCloseOrganisation(){
                let organisationReference = await Organisation.findById(organisation.id);
                organisationReference.remove();
            }())
        }
    };

    vote = {
        create(nameOfVote){
            // Admin / Moderator
        },
        close(idOfVote){
            // Admin
        },
        remove(idOfVote){
            // Admin
        },
        cast(idOfVote, vote){
            // Everyone
        },
        changeEndDate(idOfVote, newEndDate){
            // Admin
        }
    }

    member = {
        changeRole(idOfMember){
            // Admin can do this.
        }
    }

    // Write request rejected function.
}

module.exports = Role;