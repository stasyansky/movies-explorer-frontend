import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className="about">
            <h3 className="about__title" id="project">О проекте</h3>
            <div className="about__info">
                <div className="about__info_part">
                    <h4 className="about__subtitle">Дипломный проект включал 5 этапов</h4>
                    <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about__info_part">
                    <h4 className="about__subtitle">На выполнение диплома ушло 5 недель</h4>
                    <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about__grid">
                <p className="about__grid_item">1 неделя</p>
                <p className="about__grid_item">4 недели</p>
                <p className="about__grid_item">Back-end</p>
                <p className="about__grid_item">Front-end</p>
            </div>
        </section>
    );
};

export default AboutProject;
