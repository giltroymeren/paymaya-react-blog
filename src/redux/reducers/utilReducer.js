import * as types from '../actions/actionTypes';
import initialState from './initialState';

function isEndingInSuccess(type) {
    const _SUCCESS = "_SUCCESS";
    return type.substring(type.length - _SUCCESS.length) === _SUCCESS;
}

export default function apiCallStatusReducer(
    state = initialState.apiCallsInProgress,
    action
) {
    if (action.type === types.BEGIN_API_CALL) {
        return state + 1;
    } else if (
        action.type === types.API_CALL_ERROR
        || isEndingInSuccess(action.type)) {
        return state - 1;
    }

    return state;
}

