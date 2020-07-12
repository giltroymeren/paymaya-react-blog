import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PaginationList from 'react-pagination-list';

import './PostsList.css';

const PostsList = ({ posts, onDelete }) => {
    return (
        <>
            <div className="form-inline">
                <label htmlFor="sort-by" className="sr-only my-1 mr-2">Sort by</label>
                <select id="sort-by" className="form-control my-1 mr-2">
                    <option value="" disabled selected>Sort by</option>
                    <option>Date - Newest to Oldest</option>
                    <option>Date - Oldest to Newest</option>
                    <option>Alphabet - A-Z</option>
                    <option>Alphabet - Z-A</option>
                </select>

                <label htmlFor="searh-keyword" className="sr-only">Search</label>
                <div className="input-group my-1 mr-2">
                    <div className="input-group-prepend">
                        <div className="input-group-text">Search</div>
                    </div>
                    <input
                        id="search-keyword"
                        type="text"
                        className="form-control"
                        placeholder="Keyword..."
                    />
                </div>
            </div>

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
        </>
    );
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default PostsList;