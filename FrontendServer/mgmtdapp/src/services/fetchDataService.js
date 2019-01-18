import {createOrganisations} from '../actions/organisationActions';
import {createVotes} from '../actions/voteActions';
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
        let appData = {};
        appData.user = {
            username : responseJSON.user.username,
            email : responseJSON.user.email,
            id : responseJSON.user._id
        }

        appData.organisations = [];
        responseJSON.usersOrganisations.forEach((responseOrganisation)=>{
            let organisation = {};
            organisation.members = [];
            responseOrganisation.members.forEach((member)=>{
                let newMemberObject = {};
                newMemberObject.role = member.role;
                newMemberObject.id = member.userId;
                organisation.members.push(newMemberObject);
            });
            organisation.voteIds = [];
            organisation.voteIds = responseOrganisation.votes;
            organisation.id = responseOrganisation._id;
            organisation.name = responseOrganisation.name;
            appData.organisations.push(organisation);
        });

        appData.votes = [];
        responseJSON.userVotes.forEach((responseVote)=>{
            let vote = {};
            vote.name = responseVote.name;
            let voteDescription = (responseVote.description) ?  responseVote.description : null;
            vote.description = voteDescription;
            vote.created = responseVote.created;
            vote.ends = responseVote.endDate;
            vote.ended = responseVote.ended;
            vote.id = responseVote._id;
            appData.votes.push(vote);
        });
        return appData;
    }
    parseDataIntoReduxStore(appData){
        this.store.dispatch(createOrganisations(appData.organisations));
        this.store.dispatch(createVotes(appData.votes));
        this.store.dispatch(readUserData(appData.user));
    }
}

export default fetchDataServiceSingleton;