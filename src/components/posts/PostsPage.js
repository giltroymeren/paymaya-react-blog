import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import * as postActions from '../../redux/actions/postActions';

class PostsPage extends React.Component {
    state = {
        post: {
            title: "",
            content: "",
            dateCreated: new Date().toISOString()
        }
    }

    handleChange = (event) => {
        const post = {
            ...this.state.post,
            title: event.target.value,
            // content: event.target.value.content,
            // dateCreated: event.target.value.dateCreated,
        }
        this.setState({ post });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.actions.createPost(this.state.post);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <h2>Your Posts</h2>
                <h3>ADD POST</h3>
                <input
                    type="text"
                    placeholder="What are you up to today?"
                    className="form-control"
                    value={this.state.post.title}
                    onChange={this.handleChange}
                    required
                />
                {/*<textarea
                    placeholder="Describe what happened today!"
                    className="form-control"
                    onChange={this.handleChange}
                    value={this.state.post.content}
                ></textarea>
                <input
                    type="text"
                    className="form-control"
                    value={this.state.post.dateCreated}
                    disabled
                />*/}
                <input
                    type="submit"
                    value="Add"
                    className="btn btn-primary"
                />

                {
                    this.props.posts.map(post => {
                        return <div key={post.title}>{post.title}</div>
                    })
                }
            </form>
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