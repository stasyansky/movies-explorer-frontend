import React from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({isEditSuccess, onClose, successText, errorText, isErrorPostMovie}) => {
    return (
        <div
            tabIndex="-1"
            className={`popup popup_type_tooltip ${isEditSuccess ? "popup_opened" : ''}`}
            onClick={onClose}
        >
            <div className="popup__tooltip" onClick={event => event.stopPropagation()}>
                <button
                    type="button"
                    className="popup__close-btn"
                    aria-label="Закрыть попап"
                    onClick={onClose}
                >
                </button>
                <h2 className="popup__tooltip_text">
                    {isEditSuccess && successText}
                    {isErrorPostMovie && errorText}
                </h2>
            </div>
        </div>
    );
};

export default SuccessPopup;
