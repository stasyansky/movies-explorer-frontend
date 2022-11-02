import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import LogoNav from "../LogoNav/LogoNav";
import './Register.css';
import { PATTERN_EMAIL, PATTERN_NAME } from '../../utils/constants';

const Register = ({ errorRegister, handleSignUp }) => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            name: '',
            email: ''
        }
    });

    const onSubmit = (data) => {
        const { name, email, password } = data;
        handleSignUp({
            name,
            email,
            password,
        });
        reset();
    }

    return (
        <section className="register">
            <div className="register__container">
                <div className="register__header">
                    <LogoNav />
                    <p className="register__title">Добро пожаловать!</p>
                </div>
                <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="register__field">
                        <label htmlFor="username" className="register__label">Имя</label>
                        <input
                            type="text"
                            id="username"
                            className="register__input"
                            placeholder="Введите имя"
                            {...register("name", {
                                required: "Поле не должно быть пустым",
                                minLength: {
                                    value: 2,
                                    message: "Минимум 2 символа"
                                },
                                pattern: {
                                    value: PATTERN_NAME,
                                    message: 'Введите корректное имя'
                                }
                            })}
                        />
                        {errors?.name
                            && <p className="input__error_validation">
                                {errors?.name?.message || "Введите корректное имя"}
                            </p>
                        }
                    </div>

                    <div className="register__field">
                        <label htmlFor="useremail" className="register__label">E-mail</label>
                        <input
                            type="email"
                            id="useremail"
                            className="register__input"
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

                    <div className="register__field">
                        <label htmlFor="userpass" className="register__label">Пароль</label>
                        <input
                            type="password"
                            id="userpass"
                            className={`register__input ${errorRegister ? "register__input_error" : ""}`}
                            placeholder="Введите пароль"
                            {...register("password", {
                                required: "Поле не должно быть пустым",
                            })}
                        />
                    </div>
                    <p className={`register__error ${errorRegister ? "register__error_visible" : ""}`}>Что-то пошло не так...</p>
                    <button className="register__form_btn" type="submit" disabled={!isValid}>
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
