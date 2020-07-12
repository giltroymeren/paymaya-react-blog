import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function filterReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case types.SORT_BY_TITLE:
            return;
        case types.SORT_BY_DATE:
            return;
        case types.SEARCH_BY_KEYWORD:
            return;
        default:
            return state;
    }
}
