import React from "react";
import PropTypes from "prop-types";

import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";

const PostForm = ({
        post,
        onSave,
        onChange,
        saving = false,
        errors = {}
    }) => {
    return (
        <form onSubmit={onSave}>
            <h2>{post.id ? "Edit" : "Add"} post</h2>
            {
                errors.onSave && (
                    <div className="alert alert-danger" role="alert">
                        {errors.onSave}
                    </div>
                )
            }
            <TextInput
                name="title"
                label="Title"
                placeholder="What did you do today?"
                value={post.title}
                onChange={onChange}
                error={errors.title}
            />

            <TextAreaInput
                name="content"
                label="Content"
                placeholder="Describe what you did today."
                value={post.content}
                onChange={onChange}
                error={errors.content}
            />

            {
                post.id ?
                    <TextInput
                        name="dateCreated"
                        label="Date created"
                        value={post.dateCreated}
                        onChange={onChange}
                        disabled={"disabled"}
                    />
                    : ''
            }

            <button
                type="submit"
                name="submit"
                disabled={saving}
                className="btn btn-primary">
                { saving ? "Saving..." : "Save" }
            </button>
        </form>
    );
 };

PostForm.propTypes = {
    post: PropTypes.object.isRequired,
    errors: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    saving: PropTypes.bool
};

export default PostForm;
