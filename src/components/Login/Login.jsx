import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import LogoNav from "../LogoNav/LogoNav";
import './Login.css';
import { PATTERN_EMAIL } from '../../utils/constants';

const Login = ({ errorLogin, handleSignIn }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        const { email, password } = data;
        handleSignIn({
            email,
            password,
        });
        reset();
    }

    return (
        <section className="login">
            <div className="login__container">
                <div className="login__header">
                    <LogoNav />
                    <p className="login__title">Рады видеть!</p>
                </div>
                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="login__field">
                        <label htmlFor="useremail" className="login__label">E-mail</label>
                        <input
                            type="email"
                            id="useremail"
                            className={`login__input ${errorLogin ? "login__input_error" : ""}`}
                            placeholder="Введите email"
                            {...register("email", {
                                required: "Поле не должно быть пустым",
                                pattern: {
                                    value: PATTERN_EMAIL,
                                    message: 'Введите корректный email'
                                }
                            })}
                        />
                        {errors?.email
                            && <p className="profile__input_error">
                                {errors?.email?.message || "Введите корректный email"}
                            </p>
                        }
                    </div>
                    <div className="login__field">
                        <label htmlFor="userpass" className="login__label">Пароль</label>
                        <input
                            type="password"
                            id="userpass"
                            className={`login__input ${errorLogin ? "login__input_error" : ""}`}
                            placeholder="Введите пароль"
                            {...register("password", {
                                required: "Поле не должно быть пустым",
                            })}
                        />
                    </div>
                    <p className={`login__error ${errorLogin ? "login__error_visible" : ""}`}>Что-то пошло не так...</p>
                    <button className="login__form_btn" type="submit" disabled={!isValid}>
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
