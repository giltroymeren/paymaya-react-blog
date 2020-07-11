import { handleResponse, handleError } from './apiUtils';

const BASE_URL = `${process.env.API_URL}/posts/`;

export function getPosts() {
    return fetch(BASE_URL)
        .then(handleResponse)
        .catch(handleError);
}

export function savePost(post) {
    console.log(`Saving post ${post.title}`);
}