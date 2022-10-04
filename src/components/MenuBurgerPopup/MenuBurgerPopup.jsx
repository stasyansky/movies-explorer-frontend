import React from 'react';
import { Link } from "react-router-dom";
import './MenuBurgerPopup.css';
import LinkProfileAccount from "../LinkProfileAccount/LinkProfileAccount";


const MenuBurgerPopup = ({ isOpen, onClose}) => {
    return (
        <div
            tabIndex="-1"
            className={`popup__menu ${isOpen ? "popup__menu_opened" : ""}`}
            onClick={event => event.stopPropagation()}>
            <button
                type="button"
                className="popup__menu_close-btn"
                aria-label="Закрыть попап"
                onClick={onClose}
            >
            </button>
            <div className="popup__container">
               <nav className="menu__nav_links">
                   <Link to='/' className="menu__nav_link" onClick={onClose}>Главная</Link>
                   <Link to='/movies' className="menu__nav_link" onClick={onClose}>Фильмы</Link>
                   <Link to='/saved-movies' className="menu__nav_link" onClick={onClose}>Сохранённые фильмы</Link>
               </nav>
                <LinkProfileAccount onClose={onClose} />
            </div>
        </div>
    );
};

export default MenuBurgerPopup;
