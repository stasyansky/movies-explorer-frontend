import React from 'react';
import './WithoutFoundResult.css';

const WithoutFoundResult = ({ isErrorOnServer, errorServerText}) => {
    return (
        <div className="noresult__container">
            {isErrorOnServer ?
                <h2 className="noresult__title">{errorServerText}</h2>
            :   <h2 className="noresult__title">Результатов не найдено</h2>
            }
        </div>
    );
};

export default WithoutFoundResult;
