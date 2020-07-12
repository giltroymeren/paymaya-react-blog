import * as types from './actionTypes';

export const applySortByTitle = direction => {
    return {
        type: types.APPLY_SORT_BY_TITLE,
        direction
    }
}

export const applySortByDate = direction => {
    return {
        type: types.APPLY_SORT_BY_DATE,
        direction
    }
}

export function applySearchByKeyword(keyword) {
    return function(dispatch) {
        dispatch({
            type: types.APPLY_SEARCH_BY_KEYWORD,
            keyword
        });
    }
}