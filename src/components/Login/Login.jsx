import React, { useState } from 'react';
import './Login.css';
import LogoNav from "../LogoNav/LogoNav";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ errorLogin }) => {
    const [email, setEmail] = useState('pochta@yandex.ru');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setEmail('');
        setPassword('');
        navigate('/movies', { replace: true });
    }

    return (
        <section className="login">
            <div className="login__container">
                <div className="login__header">
                    <LogoNav />
                    <p className="login__title">Рады видеть!</p>
                </div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__field">
                        <label htmlFor="useremail" className="login__label">E-mail</label>
                        <input
                            type="email"
                            id="useremail"
                            name="inputEmail"
                            className={`login__input ${errorLogin ? "login__input_error" : ""}`}
                            placeholder={email}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="login__field">
                        <label htmlFor="userpass" className="login__label">Пароль</label>
                        <input
                            type="password"
                            id="userpass"
                            name="inputPass"
                            className={`login__input ${errorLogin ? "login__input_error" : ""}`}
                            placeholder=""
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>
                    <p className={`login__error ${errorLogin ? "login__error_visible" : ""}`}>Что-то пошло не так...</p>
                    <button className="login__form_btn" type="submit">
                        Войти
                    </button>
                </form>
                <div className="login__footer">
                    <p className="login__footer_text">Ещё не зарегистрированы?</p>
                    <Link to='/signup' className="login__footer_link">Регистрация</Link>
                </div>
            </div>
        </section>
    );
};

export default Login;
