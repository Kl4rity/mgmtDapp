import {combineReducers} from 'redux';
import organisations from './organisationReducer';
import user from './userReducer';
import roles from './roleReducer';

const rootReducer = combineReducers({
    organisations,
    user,
    roles
});

export default rootReducer;