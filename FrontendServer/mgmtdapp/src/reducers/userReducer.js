export default function userReducer(state = {}, action){
    switch(action.type){
        case 'READ_USER_DATA':
            return Object.assign({}, state, action.user);
        default:
            return state;
    }
}