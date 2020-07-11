import { combineReducers } from 'redux';

import posts from './postReducer';
import apiCallsInProgress from './utilReducer';

const rootReducer = combineReducers({
    posts,
    apiCallsInProgress
});

export default rootReducer;