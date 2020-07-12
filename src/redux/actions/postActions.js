import * as types from './actionTypes';
import * as postApi from '../../api/postApi';
import { beginApiCall, apiCallError } from './apiCallActions';

function loadPostsSuccess(posts) {
    return {
        type: types.LOAD_POSTS_SUCCESS,
        posts
    }
}

function createPostSuccess(post) {
    return {
        type: types.CREATE_POST_SUCCESS,
        post
    }
}

function updatePostSuccess(post) {
    return {
        type: types.UPDATE_POST_SUCCESS,
        post
    }
}

function deletePostOptimistic(post) {
    return {
        type: types.DELETE_POST_OPTIMISTIC,
        post
    }
}

export function loadPosts() {
    return function(dispatch) {
        dispatch(beginApiCall());
        return postApi.getPosts()
            .then(posts => {
                dispatch(loadPostsSuccess(posts));
            })
            .catch((error) => {
                console.error("Error occurred in loading posts");
                dispatch(apiCallError());
                throw error;
            });
    }
}

export function savePost(post) {
    return function(dispatch) {
        dispatch(beginApiCall());
        return postApi.savePost(post)
            .then(savedPost => {
                post.id
                    ? dispatch(updatePostSuccess(savedPost))
                    : dispatch(createPostSuccess(savedPost));
            })
            .catch((error) => {
                console.error("Error occurred in saving post");
                dispatch(apiCallError());
                throw error;
            });
    }
}

export function deletePost(post) {
    return function(dispatch) {
        dispatch(deletePostOptimistic(post));
        return postApi.deletePost(post.id);
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