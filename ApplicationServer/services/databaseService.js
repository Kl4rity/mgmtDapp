const mongoose = require('mongoose');
const Organisation = mongoose.model('Organisation');
const User = mongoose.model('User');
const Vote = mongoose.model('Vote');

const dataBaseService = {
    organisation: {
        create: (callingUser, nameOfOrganisation) => {
            return (async function createOrganisation() {
                let organisationReference = new Organisation();

                organisationReference.name = nameOfOrganisation;
                let newOrganisationMember = {
                    user: callingUser.id,
                    role: 'admin'
                }
                organisationReference.members.push(newOrganisationMember);

                console.log(organisationReference);
                try {
                    organisationReference.save();
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }())
        }
        , addMember: (organisationId, idOfMember) => {
            return (async function executeAddMember() {
                let organisationReference = await Organisation.findById(organisationId).exec();
                organisationReference.members[idOfMember] = 'member';

                try {
                    organisationReference.save();
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }())
        }
        , removeMember: (organisationId, idOfMember) => {
            return (async function executeRemoveMember() {
                let organisationReference = await Organisation.findById(organisationId).exec();
                delete organisationReference.members[idOfMember];

                try {
                    organisationReference.save();
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }())
        }, close: (organisationId) => {
            return (async function executeCloseOrganisation() {
                let organisationReference = await Organisation.findById(organisationId).exec();

                try {
                    organisationReference.remove();
                    return true;
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }())
        }

    }
    , vote: {
        create: (organisationId, nameOfVote, description, endDateUnix) => {
            return (async function createVote() {
                let voteReference = new Vote();

                let targetOrganisation = await Organisation.findById(organisationId).exec();

                voteReference.name = nameOfVote;
                voteReference.description = description;
                voteReference.endDate = endDateUnix;
                let votes = [];

                targetOrganisation.members.forEach((member) => {
                    votes.push({
                        voter: member.user
                    });
                });

                voteReference.votes = votes;

                try {
                    voteReference.save().then((vote) => {
                        targetOrganisation.votes.push(vote._id);
                        targetOrganisation.save();
                        return true;
                    });
                } catch (err) {
                    console.log(err)
                    return false;
                }
            }())
        },
        close: (idOfVote) => {
            return (async function closeVote() {
                let voteReference = await Vote.findById(idOfVote).exec();

                voteReference.ended = true;

                try {
                    voteReference.save();
                    return true;
                } catch (err) {
                    console.log(err)
                    return false;
                }
            }())
        },
        remove: (idOfVote) => {
            return (async function removeVote() {
                // Make these requests paralell with promises?
                let voteReference = await Vote.findById(idOfVote).exec();

                let organisationsWithVote = await Organisation.find({
                    'votes': [idOfVote]
                }).exec();

                let organisationReference = organisationsWithVote[0];

                try {
                    voteReference.remove().then(() => {
                        organisationReference.votes = organisationReference.votes.filter((vote) => {
                            return vote.id != idOfVote;
                        });
                        organisationReference.save();
                    });
                    return true;
                } catch (err) {
                    console.log(err)
                    return false;
                }
            }())
        },
        cast: (idOfVote, userId, vote) => {
            return (async function castVote() {
                let voteReference = await Vote.findById(idOfVote).exec();
                let userVoteIndex;
                let userVote = voteReference.votes.filter((vote, index) => {
                    if (vote.voter == userId) {
                        userVoteIndex = index;
                    }
                    return vote.voter == userId;
                });
                userVote.voter = mongoose.Types.ObjectId(userVote.voter);
                userVote.vote = vote;
                voteReference.votes[userVoteIndex] = userVote;
                try {
                    voteReference.save();
                    return true;
                } catch (err) {
                    console.log(err)
                    return false;
                }
            }())
        },
        changeEndDate: (idOfVote, newEndDate) => {
            return (async function moveVoteEndDate() {
                let voteReference = await Vote.findById(idOfVote).exec();

                if (Date.now() < newEndDate) {
                    voteReference.endDate = newEndDate;
                } else {
                    return false;
                }

                try {
                    voteReference.save();
                    return true;
                } catch (err) {
                    console.log(err)
                    return false;
                }
            }())

        }
    }
    , member: {
        changeRole(idOfMember, newRole) {
            // Admin can do this.
            return (async function changeMemberRole() {
                let organisationReference = await Organisation.findById().exec();
                organistationReference.members[idOfMember] = newRole;

                try {
                    organisationReference.save();
                } catch (err) {
                    console.log(err);
                    return false;
                }
            }())
        }
    }
    , user: {
        getIdForEmail(emailOfUser) {
            return (async function getUserIdForEmail() {
                try {
                    let userReference = await User.findOne({ 'email': emailOfUser }).exec();
                    return userReference._id;
                } catch (err) {
                    throw new Error("E-Mail not found in MGMT");
                }
            }())
        }
    }
}

module.exports = dataBaseService;