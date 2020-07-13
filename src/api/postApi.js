import { handleResponse, handleError } from './apiUtils';

const BASE_URL = `${process.env.API_URL}/posts/`;

export function getPosts() {
    return fetch(BASE_URL)
        .then(handleResponse)
        .catch(handleError);
}

export function savePost(post) {
    return fetch(BASE_URL + (post.id || ""), {
        method: post.id ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(post)
    })
    .then(handleResponse)
    .catch(handleError);
}

export function deletePost(id) {
    return fetch(BASE_URL + id, {
        method: "DELETE"
    })
    .then(handleResponse)
    .catch(handleError);
}