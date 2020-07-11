import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';

class PostsPage extends React.Component {
    componentDidMount() {
        this.props.actions.loadPosts()
            .catch(error => {
                console.log(`Loading posts failed: ${error}`);
            });
    }

    render() {
        return(
            <>
                <h2>Your Posts</h2>

                {
                    this.props.posts.map(post => {
                        return <div key={post.id}>{post.title}</div>
                    })
                }
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