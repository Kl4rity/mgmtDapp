export default function loadingReducer(state = false, action){
    switch(action.type){
        case 'SET_LOADING_STATE':
            let newState = state;
            return newState;
        default:
            return state;
    }
}