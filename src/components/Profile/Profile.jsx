import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import SuccessPopup from "../SuccessPopup/SuccessPopup";

const Profile = ({
    handleSignOut,
    handleEditProfile,
    setCurrentUser,
    isEditSuccess,
    onClose
}) => {

    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem('userData')));
    },[]);
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",
        defaultValues: {
            nameUser: '',
            emailUser: currentUser.email
        }
    });

    const onSubmit = (data) => {
        const { nameUser: name, emailUser: email } = data;
        handleEditProfile({ name, email });
    };

    return (
        <section className="profile">
            <div className="profile__container">
                <h2 className="profile__greeting">Привет, {currentUser.name}</h2>
                <form className="profile__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="profile__field">
                        <label htmlFor="username" className="profile__label">Имя</label>
                        <input
                            type="text"
                            id="username"
                            className="profile__input"
                            placeholder={currentUser.name}
                            {...register("nameUser", {
                                required: "Поле не должно быть пустым",
                                minLength: {
                                    value: 2,
                                    message: "Минимум 2 символа"
                                },
                                pattern: {
                                    value: /[A-Za-zА-Яа-яЁё\s-]+/,
                                    message: 'Введите корректное имя'
                                }
                            })}
                        />
                    </div>
                    {errors?.nameUser
                        && <p className="profile__input_error">
                            {errors?.nameUser?.message || "Введите корректное имя"}
                        </p>
                    }
                    <div className="profile__field">
                        <label htmlFor="usermail" className="profile__label">E-mail</label>
                        <input
                            type="email"
                            id="usermail"
                            name="inputEmail"
                            className="profile__input"
                            placeholder={currentUser.email}
                            {...register("emailUser", {
                                required: "Поле не должно быть пустым",
                                pattern: {
                                    value: /^([A-Za-z0-9\._]+)@([A-Za-z0-9])+.([a-z]+)(.[a-z]+)?$/,
                                    message: 'Введите корректный email'
                                }
                            })}
                        />
                    </div>
                    {errors?.emailUser
                        && <p className="profile__input_error">
                            {errors?.emailUser?.message || "Введите корректный email"}
                        </p>
                    }
                    <button className="profile__form_btn" type="submit" disabled={!isValid}>
                        Редактировать
                    </button>
                </form>
                <div className="profile__footer">
                    <button className="profile__btn" type="button" onClick={handleSignOut}>
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
            {isEditSuccess
                && <SuccessPopup
                    isEditSuccess={isEditSuccess}
                    onClose={onClose}
                    successText="Данные пользователя обновлены!"
                />}
        </section>
    );
};

export default Profile;
