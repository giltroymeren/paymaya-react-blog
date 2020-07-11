import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPosts, savePost } from '../../redux/actions/postActions';
import PostForm from './PostForm';

const MOCK_POST = {
    title: "My Title",
    content: "This is my content"
}

function ManagePost({
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
        }
    }, []);

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

ManagePost.propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    loadPosts: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        post: MOCK_POST,
        posts: state.posts
    };
}

const mapDispatchToProps = {
    loadPosts,
    savePost
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);