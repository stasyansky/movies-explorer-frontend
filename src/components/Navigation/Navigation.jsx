import React from 'react';
import LogoNav from "../LogoNav/LogoNav";
import './Navigation.css';
import { Routes, Route, Link } from "react-router-dom";
import LinkProfileAccount from "../LinkProfileAccount/LinkProfileAccount";

const Navigation = ({ menuOpen, desktop }) => {

    return (
        <>
            <LogoNav />
            <Routes>
                <Route path='/' element={
                    <div className="navigation__links">
                        <Link to='/signup' className="navigation__link">Регистрация</Link>
                        <Link to='/signin' className="navigation__link navigation__link_signin">Войти</Link>
                    </div>
                } />
                <Route path='/profile' element={
                    desktop ?
                        <div className="navigation__links_desktop">
                            <nav className="desktop__nav_links">
                                <Link to='/movies' className="desktop__nav_link">Фильмы</Link>
                                <Link to='/saved-movies' className="desktop__nav_link">Сохранённые фильмы</Link>
                            </nav>
                            <LinkProfileAccount />
                        </div>
                        :
                        <button type="button" className="navigation__menu" onClick={menuOpen}></button>
                } />
                <Route path='/movies' element={
                    desktop ?
                        <div className="navigation__links_desktop">
                            <nav className="desktop__nav_links">
                                <Link to='/movies' className="desktop__nav_link">Фильмы</Link>
                                <Link to='/saved-movies' className="desktop__nav_link">Сохранённые фильмы</Link>
                            </nav>
                            <LinkProfileAccount />
                        </div>
                        :
                        <button type="button" className="navigation__menu" onClick={menuOpen}></button>
                } />
                <Route path='/saved-movies' element={
                    desktop ?
                        <div className="navigation__links_desktop">
                            <nav className="desktop__nav_links">
                                <Link to='/movies' className="desktop__nav_link">Фильмы</Link>
                                <Link to='/saved-movies' className="desktop__nav_link">Сохранённые фильмы</Link>
                            </nav>
                            <LinkProfileAccount />
                        </div>
                        :
                        <button type="button" className="navigation__menu" onClick={menuOpen}></button>
                } />
            </Routes>
        </>
    );
};

export default Navigation;
