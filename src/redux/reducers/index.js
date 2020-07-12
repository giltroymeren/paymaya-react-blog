import { combineReducers } from 'redux';

import posts from './postReducer';
import apiCallsInProgress from './apiCallReducer';

const rootReducer = combineReducers({
    posts,
    apiCallsInProgress
});

export default rootReducer;