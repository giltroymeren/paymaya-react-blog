import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';

class ManagePost extends React.Component {
    componentDidMount() {
        if(this.props.posts.length === 0) {
            this.props.actions.loadPosts()
                .catch(error => {
                    console.log(`Loading posts failed: ${error}`);
                });
        }
    }

    render() {
        return(
            <>
                <h2>Manage Post</h2>
            </>
        );
    }
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