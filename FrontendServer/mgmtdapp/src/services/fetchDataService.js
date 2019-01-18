import {createOrganisations} from '../actions/organisationActions';
import {readUserData} from '../actions/userActions';

const fetchDataServiceSingleton = {
    serviceInstance : null,
    getFetchDataService : function getFetchDataService(store){
        if(!this.serviceInstance){
            this.serviceInstance = new FetchDataService(store);
            return this.serviceInstance;
        } else {
            return this.serviceInstance;
        }
    }
}

class FetchDataService {
    store = null;

    constructor(store){
        if(!store){
            throw new Error("No store was passed to the constructor of the FetchDataService.");    
        }
        this.store = store;
    }

    async fetchAllUserData(){
        let response = await fetch('https://localhost:3001/',{
            credentials: 'include',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
                },
            mode: 'cors'
            })
        return this.parseDataIntoReduxStore(this.convertJsonToDataStructure(await response.json()));
    }
    convertJsonToDataStructure(responseJSON){
        console.log(responseJSON);
        let appData = {};
        appData.user = {
            username : responseJSON.user.username,
            email : responseJSON.user.email,
            id : responseJSON.user._id
        }

        appData.organisations = [];
        if(responseJSON.organisations){
            responseJSON.organisations.forEach((responseOrganisation)=>{
                let organisation = {};

                organisation.members = [];
                responseOrganisation.members.forEach((member)=>{
                    let newMemberObject = {};
                    newMemberObject.role = member.role;
                    newMemberObject.id = member.user._id;
                    newMemberObject.username = member.user.username;
                    newMemberObject.email = member.user.email;
                    organisation.members.push(newMemberObject);
                });

                organisation.votes = [];
                responseOrganisation.votes.forEach((vote)=>{
                    let newVoteObject = {};
                    newVoteObject.creationDate = vote.created;
                    newVoteObject.endDate = vote.endDate;
                    newVoteObject.name = vote.name;
                    newVoteObject.hasEnded = vote.ended;
                    let newVoteDescription = (vote.description) ? vote.desccription : null;
                    newVoteObject.description = newVoteDescription;
                    newVoteObject.votes = [];
                    newVoteObject.votes.forEach((individualVote)=>{
                        let newIndividualVote = {};
                        newIndividualVote.response = individualVote.vote;
                        newIndividualVote.voter = responseOrganisation.members.filter((member)=>{return member.id == individualVote.voter})[0];
                    });
                    organisation.votes.push(newVoteObject);
                });

                organisation.id = responseOrganisation._id;
                organisation.name = responseOrganisation.name;
                appData.organisations.push(organisation);
            });
        }
        return appData;
    }
    parseDataIntoReduxStore(appData){
        this.store.dispatch(createOrganisations(appData.organisations));
        this.store.dispatch(readUserData(appData.user));
    }
}

export default fetchDataServiceSingleton;