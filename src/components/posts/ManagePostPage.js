import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadPosts, savePost } from '../../redux/actions/postActions';
import PostForm from './PostForm';
import Loader from '../common/Loader';

const EMPTY_POST = {
    title: "",
    content: ""
}

function ManagePostPage({
    posts,
    loadPosts,
    savePost,
    history,
    ...props }) {
    const [ post, setPost ] = useState({ ...props.post });
    const [ errors, setErrors ] = useState({ });
    const [ isSaving, setIsSaving ] = useState(false);

    useEffect(() => {
        if(posts.length === 0) {
            loadPosts()
                .catch(error => {
                    console.log(`Loading posts failed: ${error}`);
                });
        } else {
            setPost({ ...props.post });
        }
    }, [ props.post ]);

    function handleChange(event) {
        const { name, value } = event.target;

        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }))
    }

    function isPostValid() {
        const { title, content } = post;
        const errors = {};

        if(!title) errors.title = "Title is required";
        if(!content) errors.content = "Content is required";

        setErrors(errors);
        return Object.keys(errors).length === 0;
    }

    function handleSave(event) {
        event.preventDefault();

        if(!isPostValid()) return;

        setIsSaving(true);
        savePost(post)
            .then(() => {
                history.push("/posts");
            })
            .catch(error => {
                setIsSaving(false);
                setErrors({ onSave: error.message });
            })
    }

    return (
        posts.length === 0
            ? <Loader />
            : <PostForm
                post={post}
                onChange={handleChange}
                onSave={handleSave}
                isSaving={isSaving}
                errors={errors} />
    );
}

ManagePostPage.propTypes = {
    post: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    loadPosts: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
}
// TODO: move to reducers
export function getPostBySlug(posts, slug) {
    return posts.find(post => post.slug === slug) || EMPTY_POST;
}

function mapStateToProps(state, ownProps) {
    const slug = ownProps.match.params.slug;
    const post = (slug && state.posts.length > 0)
        ? getPostBySlug(state.posts, slug) : EMPTY_POST;

    return {
        post,
        posts: state.posts
    };
}

const mapDispatchToProps = {
    loadPosts,
    savePost
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagePostPage);