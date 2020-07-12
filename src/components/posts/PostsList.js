import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostsList = ({ posts, onDelete }) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Title</th>
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
                                    <Link
                                        to={`/post/edit/${post.slug}`}
                                        className="btn btn-outline-primary">
                                        EDIT
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => onDelete(post)}>
                                        DELETE
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