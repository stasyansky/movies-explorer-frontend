import React from 'react';
import './SuccessPopup.css';

const SuccessPopup = ({isOpen, onClose}) => {
    return (
        <div
            tabIndex="-1"
            className={`popup popup_type_tooltip ${isOpen ? "popup_opened" : ''}`}
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
                    Данные пользователя обновлены!
                </h2>
            </div>
        </div>
    );
};

export default SuccessPopup;
