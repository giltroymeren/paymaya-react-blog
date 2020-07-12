import * as types from '../actions/actionTypes';
import initialState from './initialState';

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
        case types.SEARCH_BY_KEYWORD_SUCCESS:
            return state.filter(post => {
                return post.title.toLowerCase().includes(action.keyword);
            });
        default:
            return state;
    }
}