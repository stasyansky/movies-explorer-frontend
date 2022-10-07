import React from 'react';
import './LinkProfileAccount.css'
import { Link } from "react-router-dom";
import accountPath from "../../images/account.svg";

const LinkProfileAccount = ({ onClose }) => {
    return (
        <div className="profile__account">
            <Link to="/profile" className="account__link" onClick={onClose}>
                <p className="account__link_text">Аккаунт</p>
                <div className="account__logo"><img src={accountPath} alt="Логотип аккаунта" /></div>
            </Link>
        </div>
    );
};

export default LinkProfileAccount;
