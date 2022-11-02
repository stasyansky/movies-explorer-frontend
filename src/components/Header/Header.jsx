import React from 'react';
import './Header.css';
import Navigation from "../Navigation/Navigation";

const Header = ({ menuOpen, desktop, loggedIn }) => {
    return (
        <header className="header">
            <Navigation menuOpen={menuOpen} desktop={desktop} loggedIn={loggedIn}/>
        </header>
    );
};

export default Header;
