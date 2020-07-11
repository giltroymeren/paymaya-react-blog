import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPosts, savePost } from '../../redux/actions/postActions';
import PostForm from './PostForm';

const EMPTY_POST = {
    title: "",
    content: ""
}

function ManagePostPage({
    posts,
    loadPosts,
    savePost,
    history,
    ...props }) {
    const [ post, setPost ] = useState({ ...props.post });
    const [ errors, setErrors ] = useState({ });

    useEffect(() => {
        if(posts.length === 0) {
            loadPosts()
                .catch(error => {
                    console.log(`Loading posts failed: ${error}`);
                });
        } else {
            setPost({ ...props.post });
        }
    }, [ props.post ]);

    function handleChange(event) {
        const { name, value } = event.target;

        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }))
    }

    function handleSave(event) {
        event.preventDefault();
        savePost(post)
            .then(() => {
                history.push("/posts");
            });
    }

    return (
        <>
            <PostForm
                post={post}
                onChange={handleChange}
                onSave={handleSave}
                errors={errors} />
        </>
    );
}

ManagePostPage.propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    loadPosts: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}
// TODO: move to reducers
export function getPostBySlug(posts, slug) {
    return posts.find(post => post.slug === slug) || null;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const post = (slug && state.posts.length > 0)
        ? getPostBySlug(state.posts, slug) : EMPTY_POST;

    return {
        post,
        posts: state.posts
    };
}

const mapDispatchToProps = {
    loadPosts,
    savePost
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePostPage);