import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsList = ({ posts, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created</th>
                    <th />
                    <th />
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
                                <td>
                                    <Link to={`/post/edit/${post.slug}`}>EDIT</Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDelete(post)}>
                                        &#215;
                                    </button>
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
    posts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default PostsList;