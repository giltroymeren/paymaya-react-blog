import * as types from './actionTypes';

export const sortByTitle = direction => {
    return {
        type: types.SORT_BY_TITLE,
        direction
    }
}

export const sortByDate = direction => {
    return {
        type: types.SORT_BY_DATE,
        direction
    }
}

export function searchByKeyword(keyword) {
    return function(dispatch) {
        dispatch({
            type: types.APPLY_SEARCH_BY_KEYWORD,
            keyword
        });
    }
}