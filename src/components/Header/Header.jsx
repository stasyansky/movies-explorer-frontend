import React from 'react';
import './Header.css';
import Navigation from "../Navigation/Navigation";

const Header = ({ menuOpen, desktop }) => {
    return (
        <header className="header">
            <Navigation menuOpen={menuOpen} desktop={desktop}/>
        </header>
    );
};

export default Header;
