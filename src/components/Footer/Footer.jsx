import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <h4 className="footer__subtitle">Учебный проект Яндекс.Практикум х BeatFilm.</h4>
            <div className="footer__container">
                <div className="footer__nav">
                    <a href="https://practicum.yandex.ru/" className="footer__nav_link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
                    <a href="https://github.com/stasyansky" className="footer__nav_link" target="_blank" rel="noreferrer">Github</a>
                </div>
                <p className="footer__copyright">&copy;2022</p>
            </div>
        </footer>
    );
};

export default Footer;
