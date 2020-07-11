import * as types from './actionTypes';
import * as postApi from '../../api/postApi';
import { beginApiCall, apiCallError } from '../actions/utilActions';

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