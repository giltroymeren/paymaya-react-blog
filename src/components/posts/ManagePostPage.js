import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';
import PostForm from './PostForm';

const MOCK_POST = {
    id: 12345,
    title: "My Title",
    content: "This is my content",
    slug: "my-title",
    dateCreated: Date.now()
}

function ManagePost({ posts, actions, ...props }) {
    const [ post, setPost ] = useState({ ...props.post });
    const [ errors, setErrors ] = useState({ });

    useEffect(() => {
        if(posts.length === 0) {
            actions.loadPosts()
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

    return (
        <>
            <PostForm
                post={post}
                onChange={handleChange}
                errors={errors} />
        </>
    );
}

ManagePost.propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePost);