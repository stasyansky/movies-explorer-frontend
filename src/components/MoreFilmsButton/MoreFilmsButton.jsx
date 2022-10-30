import React from 'react';
import './MoreFilmsButton.css';

const MoreFilmsButton = ({ handleMoreFilmsClick }) => {
    return (
        <div className="more__films">
            <button className="more__btn" type="button" onClick={handleMoreFilmsClick}>Еще</button>
        </div>
    );
};

export default MoreFilmsButton;
