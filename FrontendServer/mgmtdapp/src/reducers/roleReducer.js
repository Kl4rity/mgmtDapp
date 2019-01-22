export default function roleReducer(state = [], action){
    switch(action.type){
        case 'READ_ROLE_DATA':
            return [...action.roles];
        default:
            return state;
    }
}