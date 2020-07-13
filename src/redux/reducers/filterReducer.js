import * as types from '../actions/actionTypes';
import initialState from './initialState';

const getFilterState = (filters, isFilterPresent, type) => {
    return (isFilterPresent === -1)
        ? [...filters, type]
        : [...filters].filter(filter => filter !== type);
}

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
        // TODO: Fix broken add & delete to filters state
        case types.APPLY_SORT_BY_TITLE: {
            return getFilterState(state,
                state.indexOf(types.APPLY_SORT_BY_TITLE),
                types.APPLY_SORT_BY_TITLE);
        }
        case types.APPLY_SORT_BY_DATE: {
            return getFilterState(state,
                state.indexOf(types.APPLY_SORT_BY_DATE),
                types.APPLY_SORT_BY_DATE);
        }
        default:
            return state;
    }
}