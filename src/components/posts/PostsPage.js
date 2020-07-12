import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { loadPosts, deletePost, searchByKeyword } from '../../redux/actions/postActions';
import PostsList from './PostsList';
import Loader from '../common/Loader';

function PostsPage({
    posts,
    loadPosts,
    deletePost,
    searchByKeyword,
    loading }) {
    useEffect(() => {
        if(posts.length === 0) {
            loadPosts()
                .catch(error => {
                    console.log(`Loading posts failed: ${error}`);
                });
        }
    }, []);

    const handleDelete = (post) => {
        deletePost(post)
            .then(() => {
                console.log(`Deleted post "${post.title}".`);
            })
            .catch(error => {
                alert(`Deleting post "${post.title}" failed. ${error.message}`);
            })
    }

    const handleSearchChange = (event) => {
        const keyword = event.target.value;
        searchByKeyword(keyword);
    }

    return (
        <>
            <h2>Your Posts</h2>
            <p>
                <Link to="/post" className="badge badge-primary">Add Post</Link>
            </p>
            {
                loading > 0
                    ? <Loader />
                    : <>
                        <div className="form-inline">
                            <label htmlFor="sort-by" className="sr-only my-1 mr-2">Sort by</label>
                            <select id="sort-by" className="form-control my-1 mr-2">
                                <option value="" disabled>Sort by</option>
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
                                {/* TODO: Change to TextInput */}
                                <input
                                    id="search-keyword"
                                    type="text"
                                    className="form-control"
                                    placeholder="Keyword..."
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        <PostsList
                            posts={posts}
                            onDelete={handleDelete} />
                    </>
            }
        </>
    );
}

PostsPage.propTypes = {
    posts: PropTypes.array.isRequired,
    loadPosts: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
    searchByKeyword: PropTypes.func,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    console.log(`PostsPage: mapStateToProps`)
    console.log(state.posts)
    return {
        posts: state.posts,
        loading: (state.apiCallsInProgress > 0)
    };
}

const mapDispatchToProps = {
    loadPosts,
    deletePost,
    searchByKeyword
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);