import React from 'react';
import { useNavigate } from "react-router-dom";
import './NotFoundPage.css';

const NotFoundPage = ({ path }) => {
    const navigate = useNavigate();
    const handleGoBack = () => navigate(path);

    return (
        <section className="error__page">
            <div className="error__page_wrapper">
                <h2 className="error__page_title">404</h2>
                <h3 className="error__page_subtitle">Страница не найдена</h3>
            </div>
            <p className="error__page_back" onClick={handleGoBack}>Назад</p>
        </section>
    );
};

export default NotFoundPage;
