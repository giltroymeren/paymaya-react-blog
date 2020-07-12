import * as types from '../actions/actionTypes';
import initialState from './initialState';

const getSortAscending = (a, b) => {
    return (a > b) ? 1 : -1;
}
const getSortDescending = (a, b) => {
    return (a < b) ? 1 : -1;
}

export default function postReducer(state = initialState.posts, action) {
    switch(action.type) {
        case types.CREATE_POST_SUCCESS:
            return [ ...state, { ...action.post } ];
        case types.UPDATE_POST_SUCCESS:
            return state.map(post =>
                post.id === action.post.id ? action.post : post
            );
        case types.LOAD_POSTS_SUCCESS:
            return action.posts;
        case types.DELETE_POST_OPTIMISTIC:
            return state.filter(post => post.id !== action.post.id);
        case types.PERFORM_SEARCH_BY_KEYWORD:
            console.log(`PERFORM_SEARCH_BY_KEYWORD`, state)
            return state.filter(post => {
                return post.title.toLowerCase().includes(action.keyword);
            });
        case types.SORT_BY_TITLE: {
            const sorted = [ ...state ].sort((a, b) => {
                const strA = a.title.toLowerCase(), strB = b.title.toLowerCase();

                return (action.direction === 'asc')
                    ? getSortAscending(strA, strB)
                    : getSortDescending(strA, strB);
            });
            return sorted;
        }
        case types.SORT_BY_DATE: {
            const sorted = [ ...state ].sort((a, b) => {
                return (action.direction === 'asc')
                    ? getSortAscending(a.dateCreated, b.dateCreated)
                    : getSortDescending(a.dateCreated, b.dateCreated);
            });
            return sorted;
        }
        default:
            return state;
    }
}