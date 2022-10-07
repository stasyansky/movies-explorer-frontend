import React, { useState } from 'react';
import './Profile.css';

const Profile = ({ userName }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('pochta@yandex.ru');

    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__greeting">Привет, {userName}</h2>
                <form className="profile__form">
                    <div className="profile__field">
                        <label htmlFor="username" className="profile__label">Имя</label>
                        <input
                            type="text"
                            id="username"
                            name="inputName"
                            className="profile__input"
                            placeholder=""
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
                            placeholder={email}
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
                    <button className="profile__btn" type="button">
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
