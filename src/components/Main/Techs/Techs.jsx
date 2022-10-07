import React from 'react';
import './Techs.css';

const Techs = () => {
    return (
        <section className="techs">
            <h3 className="techs__title" id="tech">Технологии</h3>
            <div className="tech">
                <h4 className="tech__title">7 технологий</h4>
                <p className="tech__subtitle">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
            </div>
            <div className="techs__grid">
                <p className="techs__grid_item">HTML</p>
                <p className="techs__grid_item">CSS</p>
                <p className="techs__grid_item">JS</p>
                <p className="techs__grid_item">React</p>
                <p className="techs__grid_item">Git</p>
                <p className="techs__grid_item">Express.js</p>
                <p className="techs__grid_item">mongoDB</p>
            </div>
        </section>
    );
};

export default Techs;
