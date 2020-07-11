import React , { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';

function ManagePost({ posts, actions }) {
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
        </>
    );
}

ManagePost.propTypes = {
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