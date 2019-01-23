export default function loadingReducer(state = false, action){
    switch(action.type){
        case 'SET_LOADING_STATE':
            let newState = action.loadingState;
            return newState;
        default:
            return state;
    }
}