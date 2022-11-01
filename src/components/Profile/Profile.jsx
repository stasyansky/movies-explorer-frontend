import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';
import SuccessPopup from "../SuccessPopup/SuccessPopup";
import { PATTERN_EMAIL, PATTERN_NAME } from '../../utils/constants';

const Profile = ({
    handleSignOut,
    handleEditProfile,
    isEditSuccess,
    onClose
}) => {

    const currentUser = useContext(CurrentUserContext);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid, isDirty },
        reset,
    } = useForm({
        mode: "onChange",
        defaultValues: {
            nameUser: currentUser.name,
            emailUser: currentUser.email,
        }
    });

    const onSubmit = (data) => {
        const { nameUser: name, emailUser: email } = data;
        handleEditProfile({ name, email });
        reset({nameUser: name, emailUser: email });
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
                            {...register("nameUser", {
                                required: "Поле не должно быть пустым",
                                minLength: {
                                    value: 2,
                                    message: "Минимум 2 символа"
                                },
                                pattern: {
                                    value: PATTERN_NAME,
                                    message: 'Введите корректное имя'
                                },
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
                            {...register("emailUser", {
                                required: "Поле не должно быть пустым",
                                pattern: {
                                    value: PATTERN_EMAIL,
                                    message: 'Введите корректный email'
                                },
                            })}
                        />
                    </div>
                    {errors?.emailUser
                        && <p className="profile__input_error">
                            {errors?.emailUser?.message || "Введите корректный email"}
                        </p>
                    }
                    <button
                        className="profile__form_btn"
                        type="submit"
                        disabled={!isValid || !isDirty}
                    >
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
