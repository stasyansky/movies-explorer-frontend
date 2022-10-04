import React from 'react';
import './NavTab.css'
const NavTab = () => {
    return (
        <nav className="nav">
            <ul className="nav__list">
                <li><a href="#project" className="nav__link">О проекте</a></li>
                <li><a href="#tech" className="nav__link">Технологии</a></li>
                <li><a href="#student" className="nav__link">Студент</a></li>
            </ul>
        </nav>
    );
};

export default NavTab;
