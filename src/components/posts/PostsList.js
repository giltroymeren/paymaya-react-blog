import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PaginationList from 'react-pagination-list';

import './PostsList.css';

const PostsList = ({ posts, onDelete }) => {
    return (
        <PaginationList
            data={posts}
            pageSize={5}
            renderItem={post => (
                <div key={post.slug} className="row">
                    <div className="col">
                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                    </div>
                    <div className="col-1">
                        <Link
                            to={`/post/edit/${post.slug}`}
                            className="btn btn-outline-primary">
                            EDIT
                        </Link>
                    </div>
                    <div className="col-2">
                        <button
                            className="btn btn-outline-danger"
                            onClick={() => onDelete(post)}>
                            DELETE
                        </button>
                    </div>
                </div>
            )}
        />
    );
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default PostsList;