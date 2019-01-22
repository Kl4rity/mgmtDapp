export default function organisationReducer(state = [], action){
    switch(action.type){
        case 'CREATE_ORGANISATION':
            return [...state, action.organisation];
        case 'CREATE_ORGANISATIONS':
            return [...action.organisations];
        default:
            return state;
    }
}