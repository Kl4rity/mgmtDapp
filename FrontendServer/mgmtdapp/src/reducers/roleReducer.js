export default function roleReducer(state = {}, action){
    switch(action.type){
        case 'READ_ROLE_DATA':
            return Object.assign({}, state, action.roles);
        default:
            return state;
    }
}