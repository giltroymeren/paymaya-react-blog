import React from 'react';

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
        alert(this.state.post.title);
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
                    onChange={this.handleChange}
                    value={this.state.post.title}
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
                    type="Submit"
                    value="Add"
                    className="btn btn-primary"
                />
            </form>
        );
    }
}

export default PostsPage;