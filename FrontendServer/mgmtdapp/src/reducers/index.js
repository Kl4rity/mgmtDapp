import {combineReducers} from 'redux';
import organisations from './organisationReducer';
import user from './userReducer';
import roles from './roleReducer';
import loading from './loadingReducer';
import idExists from './idExistsReducer';

const rootReducer = combineReducers({
    organisations,
    user,
    roles,
    loading,
    idExists
});

export default rootReducer;