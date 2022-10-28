import React, { useState, useContext, useEffect } from 'react';
import './Profile.css';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const Profile = ({ handleSignOut, handleEditProfile, setCurrentUser }) => {

    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData')));
    },[]);

    function handleSubmit(e) {
        e.preventDefault();
        handleEditProfile({name, email});
    }

    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__greeting">Привет, {currentUser.name}</h2>
                <form className="profile__form" onSubmit={handleSubmit}>
                    <div className="profile__field">
                        <label htmlFor="username" className="profile__label">Имя</label>
                        <input
                            type="text"
                            id="username"
                            name="inputName"
                            className="profile__input"
                            placeholder={currentUser.name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="profile__field">
                        <label htmlFor="usermail" className="profile__label">E-mail</label>
                        <input
                            type="email"
                            id="usermail"
                            name="inputEmail"
                            className="profile__input"
                            placeholder={currentUser.email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <button className="profile__form_btn" type="submit">
                        Редактировать
                    </button>
                </form>
                <div className="profile__footer">
                    <button className="profile__btn" type="button" onClick={handleSignOut}>
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
