import {combineReducers} from 'redux';
import organisations from './organisationReducer';
import user from './userReducer';
import votes from './voteReducer';

const rootReducer = combineReducers({
    organisations,
    user,
    votes
});

export default rootReducer;