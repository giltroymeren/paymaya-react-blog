import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import * as postActions from '../../redux/actions/postActions';
import PostsList from './PostsList';
import Loader from '../common/Loader';

function PostsPage({ posts, actions, loading }) {
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
            <p>
                <Link to="/post" className="badge badge-primary">Add Post</Link>
            </p>
            {
                loading > 0
                    ? <Loader />
                    : <PostsList posts={posts} />
            }
        </>
    );
}

PostsPage.propTypes = {
    posts: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        loading: (state.apiCallsInProgress > 0)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(postActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);