import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
    loadPosts,
    deletePost,
    performSearchByKeyword,
    sortByTitle,
    sortByDate
} from '../../redux/actions/postActions';
import PostsList from './PostsList';
import Loader from '../common/Loader';


const FIELD_TITLE = "title",
    DIRECTION_ASC = "asc",
    DIRECTION_DES = "des",
    DEFAULT_VALUE = "defaultValue";

function PostsPage({
    posts,
    loadPosts,
    deletePost,
    performSearchByKeyword,
    sortByTitle,
    sortByDate,
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

    const handleSearch = (event) => {
        const keyword = event.target.value;
        performSearchByKeyword(keyword);
    }

    const handleSortBy = (event) => {
        const sorter = event.target.value;
        const direction = sorter.endsWith(DIRECTION_ASC) ?
            DIRECTION_ASC : DIRECTION_DES;

        if(sorter.startsWith(FIELD_TITLE)) {
            sortByTitle(direction);
        } else {
            sortByDate(direction);
        }
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
                            <select
                                id="sort-by"
                                defaultValue={DEFAULT_VALUE}
                                className="form-control my-1 mr-2"
                                onChange={handleSortBy}>
                                <option value={DEFAULT_VALUE} disabled>Sort by</option>
                                <option value="date-des">Date - Newest to Oldest</option>
                                <option value="date-asc">Date - Oldest to Newest</option>
                                <option value="title-asc">Title - A-Z</option>
                                <option value="title-des">Title - Z-A</option>
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
                                    onChange={handleSearch}
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
    performSearchByKeyword: PropTypes.func.isRequired,
    sortByTitle: PropTypes.func.isRequired,
    sortByDate: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        loading: (state.apiCallsInProgress > 0)
    };
}

const mapDispatchToProps = {
    loadPosts,
    deletePost,
    performSearchByKeyword: performSearchByKeyword,
    sortByTitle,
    sortByDate
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);