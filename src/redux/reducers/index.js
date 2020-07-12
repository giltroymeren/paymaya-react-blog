import { combineReducers } from 'redux';

import posts from './postReducer';
import apiCallsInProgress from './apiCallReducer';
import filters from './filterReducer';

const rootReducer = combineReducers({
    posts,
    apiCallsInProgress,
    filters
});

export default rootReducer;