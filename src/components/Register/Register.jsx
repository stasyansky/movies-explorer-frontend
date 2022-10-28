import React, { useState } from 'react';
import './Register.css';
import LogoNav from "../LogoNav/LogoNav";
import { Link } from "react-router-dom";

const Register = ({ errorRegister, handleSignUp }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        handleSignUp({
            name,
            email,
            password,
        });
        setEmail('');
        setPassword('');
    }

    return (
        <section className="register">
            <div className="register__container">
                <div className="register__header">
                    <LogoNav />
                    <p className="register__title">Добро пожаловать!</p>
                </div>
                <form className="register__form" onSubmit={handleSubmit}>
                    <div className="register__field">
                        <label htmlFor="username" className="register__label">Имя</label>
                        <input
                            type="text"
                            id="username"
                            name="inputName"
                            className="register__input"
                            placeholder="Введите имя"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="register__field">
                        <label htmlFor="useremail" className="register__label">E-mail</label>
                        <input
                            type="email"
                            id="useremail"
                            name="inputEmail"
                            className="register__input"
                            placeholder="Введите email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="register__field">
                        <label htmlFor="userpass" className="register__label">Пароль</label>
                        <input
                            type="password"
                            id="userpass"
                            name="inputPass"
                            className={`register__input ${errorRegister ? "register__input_error" : ""}`}
                            placeholder="Введите пароль"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <p className={`register__error ${errorRegister ? "register__error_visible" : ""}`}>Что-то пошло не так...</p>
                    <button className="register__form_btn" type="submit">
                        Зарегистрироваться
                    </button>
                </form>
                <div className="register__footer">
                    <p className="register__footer_text">Уже зарегистрированы?</p>
                    <Link to='/signin' className="register__footer_link">Войти</Link>
                </div>
            </div>
        </section>
    );
};

export default Register;
