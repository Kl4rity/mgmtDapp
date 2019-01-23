export default function idExistsReducer(state = false, action){
    switch(action.type){
        case 'SET_ID_STATE':
            let newState = action.idExists;
            return newState;
        default:
            return state;
    }
}