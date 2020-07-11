import * as types from './actionTypes';
import * as postApi from '../../api/postApi';

export function createPost(post) {
    return {
        type: types.CREATE_POST,
        post
    }
}

function loadPostsSuccess(posts) {
    return {
        type: types.LOAD_POSTS_SUCCESS,
        posts
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