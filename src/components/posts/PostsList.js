import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PaginationList from 'react-pagination-list';

import './PostsList.css';
import Modal from '../common/Modal';

const PostsList = ({ posts, onDelete }) => {
    const [ isDeleteModalOpen, setIsDeleteModalOpen ] = useState(false);
    const [ postToDelete, setPostToDelete ] = useState({});

    const toggleDeleteModal = (post) => {
        setIsDeleteModalOpen(!isDeleteModalOpen);
        setPostToDelete(post);
    }

    return (
        <>
        { posts.length > 0
            ? (
                <>
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
                                        onClick={() => toggleDeleteModal(post)}>
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        )}
                    />

                    <Modal
                        isOpen={isDeleteModalOpen}
                        close={toggleDeleteModal}
                        onDelete={onDelete}
                        post={postToDelete} />
                </>
            )
            : (
                <div className="alert alert-secondary" role="alert">
                    No posts available.
                </div>
            )}
        </>
    );
}

PostsList.propTypes = {
    posts: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
}

export default PostsList;