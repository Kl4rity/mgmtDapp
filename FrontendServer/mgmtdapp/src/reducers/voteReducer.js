export default function voteReducer(state = [], action){
    switch(action.type){
        case 'CREATE_VOTE':
            return [...state, action.vote];
        case 'CREATE_VOTES':
            return [...state, ...action.votes];
        default:
            return state;
    }
}