import * as types from './actionTypes';
import * as postApi from '../../api/postApi';

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
        return postApi.getPosts()
            .then(posts => {
                dispatch(loadPostsSuccess(posts));
            })
            .catch((error) => {
                console.error("Error occurred in loading posts");
                throw error;
            });
    }
}

export function savePost(post) {
    return function(dispatch, getState) {
        return postApi.savePost(post)
            .then(savedPost => {
                post.id
                    ? dispatch(updatePostSuccess(savedPost))
                    : dispatch(createPostSuccess(savedPost));
            })
            .catch((error) => {
                console.error("Error occurred in saving post");
                throw error;
            });
    }
}