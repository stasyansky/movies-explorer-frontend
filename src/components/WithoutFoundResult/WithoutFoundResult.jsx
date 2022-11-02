import React from 'react';
import './WithoutFoundResult.css';
import {ERROR_SERVER_TEXT} from "../../utils/constants";

const WithoutFoundResult = ({ isErrorOnServer }) => {
    return (
        <div className="noresult__container">
            {isErrorOnServer
            ? <h2 className="noresult__title">{ERROR_SERVER_TEXT}</h2>
            : <h2 className="noresult__title">Результатов не найдено</h2>
            }
        </div>
    );
};

export default WithoutFoundResult;
