import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({
    isOpen,
    close,
    onDelete,
    post
}) => {
    const openStyle = {
        display: 'block'
    }

    return (
    <>
        <div
            className="modal"
            tabIndex="-1"
            role="dialog"
            style={isOpen ? openStyle : {}}>
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">
                        Do you want to delete this post?
                    </h5>
                    <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() => close()}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        data-dismiss="modal"
                        onClick={() => close()}>
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                            onDelete(post);
                            close();
                        }}>
                        Delete
                    </button>
                </div>
                </div>
            </div>
        </div>
        { isOpen ? <div className="modal-backdrop fade show"></div> : '' }
    </>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    post: PropTypes.object
}

export default Modal;