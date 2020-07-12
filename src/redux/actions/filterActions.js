import * as types from './actionTypes';

export const sortByTitle = title => {
    return {
        action: types.SORT_BY_TITLE,
        title
    }
}

export const sortByDate = date => {
    return {
        action: types.SORT_BY_TITLE,
        date
    }
}

export const searchByKeyword = keyword => {
    return {
        action: types.SEARCH_BY_KEYWORD,
        keyword
    }
}