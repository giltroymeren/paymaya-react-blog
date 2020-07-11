import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';
import PostsList from './PostsList';

function PostsPage({ posts, actions}) {
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
            <h2>Your Posts</h2>
            <PostsList posts={posts} />
        </>
    );
}

PostsPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);