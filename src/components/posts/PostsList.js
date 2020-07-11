import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsList = ({ posts }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Date Created</th>
                </tr>
            </thead>
            <tbody>
                {
                    posts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td>
                                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                </td>
                                <td>
                                    {`${post.content.substring(0, 100)}...`}
                                </td>
                                <td>
                                    <code>{new Date(parseInt(post.dateCreated)).toLocaleString()}</code>
                                </td>
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
    );
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostsList;