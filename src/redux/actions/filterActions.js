import * as types from './actionTypes';

export const sortByTitle = title => {
    return {
        type: types.SORT_BY_TITLE,
        title
    }
}

export const sortByDate = date => {
    return {
        type: types.SORT_BY_TITLE,
        date
    }
}

const searchByKeywordSuccess = (keyword) => {
    return {
        type: types.SEARCH_BY_KEYWORD_SUCCESS,
        keyword
    }
}


export function searchByKeyword(keyword) {
    return function(dispatch) {
        dispatch(searchByKeywordSuccess(keyword));
    }
}