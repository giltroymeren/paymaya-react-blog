import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';
import PostsList from './PostsList';

class PostsPage extends React.Component {
    componentDidMount() {
        if(this.props.posts.lentgh === 0) {
            this.props.actions.loadPosts()
                .catch(error => {
                    console.log(`Loading posts failed: ${error}`);
                });
        }
    }

    render() {
        return(
            <>
                <h2>Your Posts</h2>
                <PostsList posts={this.props.posts} />
            </>
        );
    }
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