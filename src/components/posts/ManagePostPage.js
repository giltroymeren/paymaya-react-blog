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
    const [ post, SetPost ] = useState({ ...props.post });

    useEffect(() => {
        if(posts.length === 0) {
            actions.loadPosts()
                .catch(error => {
                    console.log(`Loading posts failed: ${error}`);
                });
        }
    }, []);

    return (
        <>
            <h2>Manage Post</h2>
            <PostForm post={post} />
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