import React from 'react';
import './AboutMe.css';
import myPhotoPath from '../../../images/foto.png';

const AboutMe = () => {
    return (
        <section className="student">
            <h3 className="student__title" id="student">Студент</h3>
            <div className="student__container">
                <div className="student__img">
                    <img src={myPhotoPath} alt="Фотография студента" className="student__foto"/>
                </div>
                <div className="student__biography">
                    <h4 className="student__name">Станислав</h4>
                    <p className="student__prof">Фронтенд-разработчик, 29 лет</p>
                    <p className="student__info">Я родился в городе Липецк, на данный момент живу в Москве, закончил МТУТУ им. Разумовского, специальность "Прикладная информатика (в экономике)". Я люблю слушать музыку, а ещё увлекаюсь автомобилями. Первый опыт в программировании получил во время учебы в университете. Работать изначально по специальности не стал, отслужил в армии и еще 6 лет по контракту. В конце 2021 года ушёл с постоянной работы и записался на курсы на веб-разработчика.</p>
                    <a href="https://github.com/stasyansky" className="student__link" target="_blank"  rel="noreferrer">Github</a>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
