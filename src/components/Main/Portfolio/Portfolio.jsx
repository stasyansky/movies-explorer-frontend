import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <div className="portfolio__links">
                <a href="https://github.com/stasyansky/how-to-learn" className="portfolio__link" target="_blank" rel="noreferrer">
                    <span>Статичный сайт</span>
                    <span>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.56392 10.7145L0.566762 9.71733L7.98153 2.28977H2.25426L2.26705 0.909091H10.3594V9.0142H8.96591L8.97869 3.28693L1.56392 10.7145Z" fill="white"/>
                        </svg>
                    </span>
                </a>
                <a href="https://github.com/stasyansky/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
                    <span>Адаптивный сайт</span>
                    <span>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.56392 10.7145L0.566762 9.71733L7.98153 2.28977H2.25426L2.26705 0.909091H10.3594V9.0142H8.96591L8.97869 3.28693L1.56392 10.7145Z" fill="white"/>
                        </svg>
                    </span>
                </a>
                <a href="https://github.com/stasyansky/mesto-react" className="portfolio__link" target="_blank" rel="noreferrer">
                    <span>Одностраничное приложение</span>
                    <span>
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.56392 10.7145L0.566762 9.71733L7.98153 2.28977H2.25426L2.26705 0.909091H10.3594V9.0142H8.96591L8.97869 3.28693L1.56392 10.7145Z" fill="white"/>
                        </svg>
                    </span></a>
            </div>
        </section>
    );
};

export default Portfolio;
