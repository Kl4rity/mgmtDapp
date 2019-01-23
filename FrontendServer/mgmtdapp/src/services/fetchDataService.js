import { createOrganisations } from '../actions/organisationActions';
import { readUserData } from '../actions/userActions';
import { readRoleData } from '../actions/roleActions';

const fetchDataServiceSingleton = {
    serviceInstance: null,
    getFetchDataService: function getFetchDataService(store) {
        if (!this.serviceInstance) {
            this.serviceInstance = new FetchDataService(store);
            return this.serviceInstance;
        } else {
            return this.serviceInstance;
        }
    }
}

class FetchDataService {
    store = null;

    constructor(store) {
        if (!store) {
            throw new Error("No store was passed to the constructor of the FetchDataService.");
        }
        this.store = store;
    }

    async fetchAllUserData() {
        let response = await fetch('https://localhost:3001/', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
        try {
            let responseJSON = await response.json();
            this.parseDataIntoReduxStore(this.convertJsonToDataStructure(responseJSON));
        } catch (err) {
            console.error("An error occured loading data from the backend.");
            console.error(err);
        }
    }
    convertJsonToDataStructure(responseJSON) {
        let appData = {};
        appData.user = {
            username: responseJSON.user.username,
            email: responseJSON.user.email,
            id: responseJSON.user._id
        }

        appData.roles = responseJSON.roles;

        appData.organisations = [];
        if (responseJSON.organisations) {
            responseJSON.organisations.forEach((responseOrganisation) => {
                let organisation = {};

                organisation.members = [];
                responseOrganisation.members.forEach((member) => {
                    let newMemberObject = {};
                    newMemberObject.role = member.role;
                    newMemberObject.id = member.user._id;
                    newMemberObject.username = member.user.username;
                    newMemberObject.email = member.user.email;
                    organisation.members.push(newMemberObject);
                });

                organisation.votes = [];
                responseOrganisation.votes.forEach((vote) => {
                    let newVoteObject = {};
                    newVoteObject.creationDate = vote.created;
                    newVoteObject.endDate = vote.endDate;
                    newVoteObject.name = vote.name;
                    newVoteObject.hasEnded = vote.ended;
                    let newVoteDescription = (vote.description) ? vote.desccription : null;
                    newVoteObject.description = newVoteDescription;
                    newVoteObject.votes = [];
                    vote.votes.forEach((individualVote) => {
                        let newIndividualVote = {};
                        newIndividualVote.response = individualVote.vote;
                        newIndividualVote.voter = responseOrganisation.members.filter((member) => { return member.id == individualVote.voter })[0];
                        newVoteObject.votes.push(newIndividualVote);
                    });
                    organisation.votes.push(newVoteObject);
                });

                organisation.id = responseOrganisation._id;
                organisation.name = responseOrganisation.name;
                appData.organisations.push(organisation);
            });
        }
        console.log("Total data:");
        console.log(appData);
        return appData;
    }
    parseDataIntoReduxStore(appData) {
        this.store.dispatch(createOrganisations(appData.organisations));
        if (!!this.store.getState().user) {
            this.store.dispatch(readUserData(appData.user));
            this.store.dispatch(readRoleData(appData.roles));
        }
    }
}

export default fetchDataServiceSingleton;