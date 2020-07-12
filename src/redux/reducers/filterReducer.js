import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function filterReducer(
    state = initialState.filters,
    action
) {
    switch(action.type) {
        case types.APPLY_SEARCH_BY_KEYWORD: {
            const isFilterPresent = state.indexOf(types.APPLY_SEARCH_BY_KEYWORD);

            return (action.keyword && isFilterPresent === -1)
                ? [...state, types.APPLY_SEARCH_BY_KEYWORD]
                : [...state].filter(filter => filter !== types.APPLY_SEARCH_BY_KEYWORD);
        }
        default:
            return state;
    }
}