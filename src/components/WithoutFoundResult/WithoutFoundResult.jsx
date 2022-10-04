import React from 'react';
import './WithoutFoundResult.css';
import Preloader from "../Preloader/Preloader";

const WithoutFoundResult = () => {
    return (
        <div className="noresult__container">
            <h2 className="noresult__title">Результатов не найдено</h2>
            <Preloader />
        </div>
    );
};

export default WithoutFoundResult;
