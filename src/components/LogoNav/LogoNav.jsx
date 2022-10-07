import React from 'react';
import { Link } from "react-router-dom";
import logoPath from "../../images/logo.svg";

const LogoNav = () => {
    return (
        <>
            <Link to='/'><img className="navigation__logo" src={logoPath} alt="Логотип сайта"/></Link>
        </>
    );
};

export default LogoNav;
